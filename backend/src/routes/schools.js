const express        = require('express');
const router         = express.Router();
const pool           = require('../db');
const authMiddleware = require('../middleware/auth');

// ── Helper: cari ID dari tabel lookup ─────────────────────────
async function getLookupId(table, column, value) {
  const res = await pool.query(
    `SELECT ${table}_id FROM ${table} WHERE ${column} = $1`, [value]
  );
  if (res.rows.length === 0)
    throw new Error(`Nilai "${value}" tidak ditemukan di tabel ${table}`);
  return res.rows[0][`${table}_id`];
}

// ── Query dasar dari VIEW ──────────────────────────────────────
const BASE_SELECT = `
  SELECT
    v.*,
    ROUND(0::numeric, 2) AS jarak_km
  FROM v_sekolah_lengkap v
  WHERE 1=1
`;

// ================================================================
// GET /api/schools — semua sekolah + filter
// Query params: jenjang, status, akreditasi, kecamatan, kurikulum
// ================================================================
router.get('/', async (req, res) => {
  const { jenjang, status, akreditasi, kecamatan, kurikulum } = req.query;
  const params = [];
  let idx = 1;
  let where = '';

  if (jenjang)    { where += ` AND v.jenjang   = $${idx++}`;      params.push(jenjang); }
  if (status)     { where += ` AND v.status    = $${idx++}`;      params.push(status); }
  if (akreditasi) { where += ` AND v.akreditasi = $${idx++}`;     params.push(akreditasi); }
  if (kecamatan)  { where += ` AND v.kecamatan ILIKE $${idx++}`;  params.push(`%${kecamatan}%`); }
  if (kurikulum)  { where += ` AND v.kurikulum  = $${idx++}`;     params.push(kurikulum); }

  const query = `
    SELECT v.*
    FROM v_sekolah_lengkap v
    WHERE 1=1 ${where}
    ORDER BY v.nama_sekolah ASC
  `;

  try {
    const result = await pool.query(query, params);
    res.json({ success: true, total: result.rowCount, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================================================================
// GET /api/schools/nearby — sekolah terdekat (PostGIS)
// Params: lat, lng, radius (km, default 5), jenjang, status, akreditasi
// ================================================================
router.get('/nearby', async (req, res) => {
  const { lat, lng, jenjang, status, akreditasi } = req.query;
  const radius = parseFloat(req.query.radius) || 5;

  if (!lat || !lng)
    return res.status(400).json({ success: false, message: 'lat dan lng wajib diisi.' });

  const params = [parseFloat(lng), parseFloat(lat), radius * 1000];
  let idx = 4;
  let where = '';

  if (jenjang)    { where += ` AND v.jenjang    = $${idx++}`; params.push(jenjang); }
  if (status)     { where += ` AND v.status     = $${idx++}`; params.push(status); }
  if (akreditasi) { where += ` AND v.akreditasi = $${idx++}`; params.push(akreditasi); }

  const query = `
    SELECT
      v.*,
      ROUND(
        ST_Distance(
          v.lokasi::geography,
          ST_MakePoint($1, $2)::geography
        )::numeric / 1000
      , 2) AS jarak_km
    FROM v_sekolah_lengkap v
    WHERE ST_DWithin(
        v.lokasi::geography,
        ST_MakePoint($1, $2)::geography,
        $3
    ) ${where}
    ORDER BY jarak_km ASC
    LIMIT 30
  `;

  try {
    const result = await pool.query(query, params);
    res.json({ success: true, total: result.rowCount, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================================================================
// GET /api/schools/options — ambil semua nilai lookup untuk dropdown
// Dipakai Mobile PWA untuk mengisi opsi form secara dinamis
// ================================================================
router.get('/options', async (req, res) => {
  try {
    const [jenjang, status, akreditasi, kurikulum, kecamatan, spp, ekskul] =
      await Promise.all([
        pool.query('SELECT jenjang_id AS id, nama_jenjang AS nama FROM jenjang ORDER BY jenjang_id'),
        pool.query('SELECT status_id AS id, nama_status AS nama FROM status ORDER BY status_id'),
        pool.query('SELECT akreditasi_id AS id, nama_akreditasi AS nama FROM akreditasi ORDER BY akreditasi_id'),
        pool.query('SELECT kurikulum_id AS id, nama_kurikulum AS nama FROM kurikulum ORDER BY kurikulum_id'),
        pool.query('SELECT kecamatan_id AS id, nama_kecamatan AS nama FROM kecamatan ORDER BY nama_kecamatan'),
        pool.query('SELECT spp_id AS id, keterangan AS nama FROM spp_kategori ORDER BY spp_id'),
        pool.query('SELECT ekskul_id AS id, nama_ekskul AS nama FROM ekskul ORDER BY nama_ekskul'),
      ]);

    res.json({
      success: true,
      data: {
        jenjang:    jenjang.rows,
        status:     status.rows,
        akreditasi: akreditasi.rows,
        kurikulum:  kurikulum.rows,
        kecamatan:  kecamatan.rows,
        spp:        spp.rows,
        ekskul:     ekskul.rows,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================================================================
// GET /api/schools/:id — detail satu sekolah
// ================================================================
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM v_sekolah_lengkap WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================================================================
// POST /api/schools — tambah sekolah baru (perlu login)
// Body: nama_sekolah, npsn, jenjang (string), status (string),
//       akreditasi (string), kurikulum (string), kecamatan (string),
//       spp_id (int), jumlah_siswa, jumlah_guru, alamat,
//       jam_operasional, no_telepon, website, foto_url,
//       lat (float), lng (float),
//       fasilitas: { has_lab_komputer, has_perpustakaan, ... },
//       ekskul: [array nama ekskul string]
// ================================================================
router.post('/', authMiddleware, async (req, res) => {
  const {
    nama_sekolah, npsn, jenjang, status, akreditasi, kurikulum,
    kecamatan, spp_id, jumlah_siswa, jumlah_guru, alamat,
    jam_operasional, no_telepon, website, foto_url, lat, lng,
    has_lab_komputer, has_perpustakaan, has_lapangan,
    has_lab_ipa, has_musholla, has_kantin,
    ekskul = []
  } = req.body;

  if (!nama_sekolah || !jenjang || !lat || !lng)
    return res.status(400).json({ success: false, message: 'Field wajib: nama_sekolah, jenjang, lat, lng.' });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Cari ID dari tabel lookup
    const jenjangId    = await getLookupId('jenjang',     'nama_jenjang',    jenjang);
    const statusId     = await getLookupId('status',      'nama_status',     status);
    const akreditasiId = await getLookupId('akreditasi',  'nama_akreditasi', akreditasi);
    const kurikulumId  = await getLookupId('kurikulum',   'nama_kurikulum',  kurikulum);
    const kecamatanId  = await getLookupId('kecamatan',   'nama_kecamatan',  kecamatan);

    // 2. Insert ke tabel sekolah
    const sekolahRes = await client.query(`
      INSERT INTO sekolah (
        nama_sekolah, npsn, jenjang_id, status_id, akreditasi_id,
        kurikulum_id, kecamatan_id, spp_id,
        jumlah_siswa, jumlah_guru, alamat,
        jam_operasional, no_telepon, website, foto_url,
        lokasi_lat, lokasi_lng,
        lokasi
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15,
        $16, $17,
        ST_SetSRID(ST_MakePoint($17, $16), 4326)
      ) RETURNING sekolah_id
    `, [
      nama_sekolah, npsn || null, jenjangId, statusId, akreditasiId,
      kurikulumId, kecamatanId, spp_id || 1,
      jumlah_siswa || null, jumlah_guru || null, alamat || null,
      jam_operasional || 'Pagi', no_telepon || null, website || null, foto_url || null,
      parseFloat(lat), parseFloat(lng)
    ]);

    const sekolahId = sekolahRes.rows[0].sekolah_id;

    // 3. Insert fasilitas
    await client.query(`
      INSERT INTO fasilitas_sekolah (
        sekolah_id, has_lab_komputer, has_perpustakaan, has_lapangan,
        has_lab_ipa, has_musholla, has_kantin
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      sekolahId,
      has_lab_komputer  || false,
      has_perpustakaan  || false,
      has_lapangan      || false,
      has_lab_ipa       || false,
      has_musholla      || false,
      has_kantin        || false
    ]);

    // 4. Insert ekskul ke junction table
    // Terima array nama ekskul → cari ID → insert ke sekolah_ekskul
    const ekskulList = Array.isArray(ekskul)
      ? ekskul
      : (typeof ekskul === 'string'
          ? ekskul.split(',').map(e => e.trim()).filter(Boolean)
          : []);

    for (const namaEkskul of ekskulList) {
      const ekskulRes = await client.query(
        'SELECT ekskul_id FROM ekskul WHERE nama_ekskul ILIKE $1', [namaEkskul]
      );
      if (ekskulRes.rows.length > 0) {
        await client.query(
          'INSERT INTO sekolah_ekskul (sekolah_id, ekskul_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [sekolahId, ekskulRes.rows[0].ekskul_id]
        );
      }
    }

    await client.query('COMMIT');
    res.status(201).json({
      success: true,
      message: 'Sekolah berhasil ditambahkan!',
      data: { id: sekolahId, nama_sekolah }
    });

  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === '23505')
      return res.status(409).json({ success: false, message: 'NPSN sudah terdaftar.' });
    res.status(500).json({ success: false, message: err.message });
  } finally {
    client.release();
  }
});

// ================================================================
// PUT /api/schools/:id — update sekolah (perlu login)
// ================================================================
router.put('/:id', authMiddleware, async (req, res) => {
  const {
    nama_sekolah, npsn, jenjang, status, akreditasi, kurikulum,
    kecamatan, spp_id, jumlah_siswa, jumlah_guru, alamat,
    jam_operasional, no_telepon, website, foto_url, lat, lng,
    has_lab_komputer, has_perpustakaan, has_lapangan,
    has_lab_ipa, has_musholla, has_kantin,
    ekskul = []
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const jenjangId    = await getLookupId('jenjang',    'nama_jenjang',    jenjang);
    const statusId     = await getLookupId('status',     'nama_status',     status);
    const akreditasiId = await getLookupId('akreditasi', 'nama_akreditasi', akreditasi);
    const kurikulumId  = await getLookupId('kurikulum',  'nama_kurikulum',  kurikulum);
    const kecamatanId  = await getLookupId('kecamatan',  'nama_kecamatan',  kecamatan);

    const result = await client.query(`
      UPDATE sekolah SET
        nama_sekolah=$1, npsn=$2, jenjang_id=$3, status_id=$4, akreditasi_id=$5,
        kurikulum_id=$6, kecamatan_id=$7, spp_id=$8,
        jumlah_siswa=$9, jumlah_guru=$10, alamat=$11,
        jam_operasional=$12, no_telepon=$13, website=$14, foto_url=$15,
        lokasi_lat=$16, lokasi_lng=$17,
        lokasi=ST_SetSRID(ST_MakePoint($17, $16), 4326)
      WHERE sekolah_id=$18
      RETURNING sekolah_id, nama_sekolah
    `, [
      nama_sekolah, npsn || null, jenjangId, statusId, akreditasiId,
      kurikulumId, kecamatanId, spp_id || 1,
      jumlah_siswa || null, jumlah_guru || null, alamat || null,
      jam_operasional || 'Pagi', no_telepon || null, website || null, foto_url || null,
      parseFloat(lat), parseFloat(lng), req.params.id
    ]);

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan.' });
    }

    // Update fasilitas (upsert)
    await client.query(`
      INSERT INTO fasilitas_sekolah (
        sekolah_id, has_lab_komputer, has_perpustakaan, has_lapangan,
        has_lab_ipa, has_musholla, has_kantin
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (sekolah_id) DO UPDATE SET
        has_lab_komputer = EXCLUDED.has_lab_komputer,
        has_perpustakaan = EXCLUDED.has_perpustakaan,
        has_lapangan     = EXCLUDED.has_lapangan,
        has_lab_ipa      = EXCLUDED.has_lab_ipa,
        has_musholla     = EXCLUDED.has_musholla,
        has_kantin       = EXCLUDED.has_kantin
    `, [
      req.params.id,
      has_lab_komputer || false, has_perpustakaan || false, has_lapangan || false,
      has_lab_ipa || false, has_musholla || false, has_kantin || false
    ]);

    // Update ekskul: hapus lama, insert baru
    await client.query('DELETE FROM sekolah_ekskul WHERE sekolah_id = $1', [req.params.id]);
    const ekskulList = Array.isArray(ekskul)
      ? ekskul
      : (typeof ekskul === 'string'
          ? ekskul.split(',').map(e => e.trim()).filter(Boolean)
          : []);

    for (const namaEkskul of ekskulList) {
      const ekskulRes = await client.query(
        'SELECT ekskul_id FROM ekskul WHERE nama_ekskul ILIKE $1', [namaEkskul]
      );
      if (ekskulRes.rows.length > 0) {
        await client.query(
          'INSERT INTO sekolah_ekskul (sekolah_id, ekskul_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [req.params.id, ekskulRes.rows[0].ekskul_id]
        );
      }
    }

    await client.query('COMMIT');
    res.json({ success: true, message: 'Data berhasil diupdate!', data: result.rows[0] });

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, message: err.message });
  } finally {
    client.release();
  }
});

// ================================================================
// DELETE /api/schools/:id — hapus sekolah (perlu login)
// ================================================================
router.delete('/:id', authMiddleware, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM sekolah_ekskul      WHERE sekolah_id = $1', [req.params.id]);
    await client.query('DELETE FROM fasilitas_sekolah   WHERE sekolah_id = $1', [req.params.id]);
    const result = await client.query(
      'DELETE FROM sekolah WHERE sekolah_id = $1 RETURNING sekolah_id, nama_sekolah',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan.' });
    }
    await client.query('COMMIT');
    res.json({ success: true, message: `${result.rows[0].nama_sekolah} berhasil dihapus.` });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, message: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;