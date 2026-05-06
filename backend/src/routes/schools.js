const express   = require('express');
const router    = express.Router();
const pool      = require('../db');
const authMiddleware = require('../middleware/auth');

// helper: konversi string "Pramuka, Seni, Futsal" → array ['Pramuka','Seni','Futsal']
function parseEkskul(ekskul) {
  if (!ekskul) return null;
  if (Array.isArray(ekskul)) return ekskul;
  return ekskul.split(',').map(e => e.trim()).filter(e => e.length > 0);
}

// ============================================================
// GET /api/schools — ambil semua sekolah + filter
// ============================================================
router.get('/', async (req, res) => {
  const { jenjang, status, akreditasi, kecamatan, kurikulum } = req.query;

  let query  = 'SELECT *, ST_X(lokasi::geometry) AS lng, ST_Y(lokasi::geometry) AS lat FROM schools WHERE 1=1';
  const params = [];
  let idx = 1;

  if (jenjang)    { query += ` AND jenjang    = $${idx++}`;     params.push(jenjang); }
  if (status)     { query += ` AND status     = $${idx++}`;     params.push(status); }
  if (akreditasi) { query += ` AND akreditasi = $${idx++}`;     params.push(akreditasi); }
  if (kecamatan)  { query += ` AND kecamatan  ILIKE $${idx++}`; params.push(`%${kecamatan}%`); }
  if (kurikulum)  { query += ` AND kurikulum  = $${idx++}`;     params.push(kurikulum); }

  query += ' ORDER BY nama_sekolah ASC';

  try {
    const result = await pool.query(query, params);
    res.json({ success: true, total: result.rowCount, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================
// GET /api/schools/nearby — sekolah terdekat
// ============================================================
router.get('/nearby', async (req, res) => {
  const { lat, lng, jenjang, status, akreditasi } = req.query;
  const radius = parseFloat(req.query.radius) || 5;

  if (!lat || !lng)
    return res.status(400).json({ success: false, message: 'Parameter lat dan lng wajib diisi.' });

  let query = `
    SELECT *,
      ST_X(lokasi::geometry) AS lng,
      ST_Y(lokasi::geometry) AS lat,
      ROUND(ST_Distance(lokasi::geography, ST_MakePoint($1, $2)::geography) / 1000.0, 2) AS jarak_km
    FROM schools
    WHERE ST_DWithin(lokasi::geography, ST_MakePoint($1, $2)::geography, $3)
  `;
  const params = [parseFloat(lng), parseFloat(lat), radius * 1000];
  let idx = 4;

  if (jenjang)    { query += ` AND jenjang    = $${idx++}`; params.push(jenjang); }
  if (status)     { query += ` AND status     = $${idx++}`; params.push(status); }
  if (akreditasi) { query += ` AND akreditasi = $${idx++}`; params.push(akreditasi); }

  query += ' ORDER BY jarak_km ASC LIMIT 20';

  try {
    const result = await pool.query(query, params);
    res.json({ success: true, total: result.rowCount, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================
// GET /api/schools/:id — detail satu sekolah
// ============================================================
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT *, ST_X(lokasi::geometry) AS lng, ST_Y(lokasi::geometry) AS lat FROM schools WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================
// POST /api/schools — tambah sekolah baru (perlu login)
// ============================================================
router.post('/', authMiddleware, async (req, res) => {
  const {
    nama_sekolah, npsn, jenjang, status, akreditasi, kurikulum,
    jam_operasional, kecamatan, alamat, jumlah_siswa, jumlah_guru,
    spp, no_telepon, website,
    has_lab_komputer, has_lab_ipa, has_perpustakaan,
    has_lapangan, has_musholla, has_kantin,
    ekskul, foto_url, lat, lng
  } = req.body;

  if (!nama_sekolah || !jenjang || !lat || !lng)
    return res.status(400).json({ success: false, message: 'Field wajib: nama_sekolah, jenjang, lat, lng.' });

  // FIX: konversi string ekskul → array PostgreSQL
  const ekskulArray = parseEkskul(ekskul);

  try {
    const result = await pool.query(`
      INSERT INTO schools (
        nama_sekolah, npsn, jenjang, status, akreditasi, kurikulum,
        jam_operasional, kecamatan, alamat, jumlah_siswa, jumlah_guru,
        spp, no_telepon, website,
        has_lab_komputer, has_lab_ipa, has_perpustakaan,
        has_lapangan, has_musholla, has_kantin,
        ekskul, foto_url, lokasi
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,
        $15,$16,$17,$18,$19,$20,$21,$22,
        ST_SetSRID(ST_MakePoint($24, $23), 4326)
      ) RETURNING id, nama_sekolah, jenjang
    `, [
      nama_sekolah, npsn, jenjang, status, akreditasi, kurikulum,
      jam_operasional, kecamatan, alamat,
      jumlah_siswa || null, jumlah_guru || null, spp || null,
      no_telepon, website,
      has_lab_komputer || false, has_lab_ipa || false, has_perpustakaan || false,
      has_lapangan || false, has_musholla || false, has_kantin || false,
      ekskulArray, foto_url || null,
      parseFloat(lat), parseFloat(lng)
    ]);

    res.status(201).json({ success: true, message: 'Sekolah berhasil ditambahkan!', data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505')
      return res.status(409).json({ success: false, message: 'NPSN sudah terdaftar.' });
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================
// PUT /api/schools/:id — edit data sekolah (perlu login)
// ============================================================
router.put('/:id', authMiddleware, async (req, res) => {
  const {
    nama_sekolah, npsn, jenjang, status, akreditasi, kurikulum,
    jam_operasional, kecamatan, alamat, jumlah_siswa, jumlah_guru,
    spp, no_telepon, website,
    has_lab_komputer, has_lab_ipa, has_perpustakaan,
    has_lapangan, has_musholla, has_kantin,
    ekskul, foto_url, lat, lng
  } = req.body;

  // FIX: konversi string ekskul → array PostgreSQL
  const ekskulArray = parseEkskul(ekskul);

  try {
    const result = await pool.query(`
      UPDATE schools SET
        nama_sekolah=$1, npsn=$2, jenjang=$3, status=$4, akreditasi=$5,
        kurikulum=$6, jam_operasional=$7, kecamatan=$8, alamat=$9,
        jumlah_siswa=$10, jumlah_guru=$11, spp=$12, no_telepon=$13, website=$14,
        has_lab_komputer=$15, has_lab_ipa=$16, has_perpustakaan=$17,
        has_lapangan=$18, has_musholla=$19, has_kantin=$20,
        ekskul=$21, foto_url=$22,
        lokasi=ST_SetSRID(ST_MakePoint($24, $23), 4326)
      WHERE id=$25
      RETURNING id, nama_sekolah
    `, [
      nama_sekolah, npsn, jenjang, status, akreditasi,
      kurikulum, jam_operasional, kecamatan, alamat,
      jumlah_siswa || null, jumlah_guru || null, spp || null,
      no_telepon, website,
      has_lab_komputer || false, has_lab_ipa || false, has_perpustakaan || false,
      has_lapangan || false, has_musholla || false, has_kantin || false,
      ekskulArray, foto_url || null,
      parseFloat(lat), parseFloat(lng),
      req.params.id
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan.' });
    res.json({ success: true, message: 'Data sekolah berhasil diupdate!', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================
// DELETE /api/schools/:id — hapus sekolah (perlu login)
// ============================================================
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM schools WHERE id = $1 RETURNING id, nama_sekolah',
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan.' });
    res.json({ success: true, message: `${result.rows[0].nama_sekolah} berhasil dihapus.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;