const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

// GET semua sekolah
app.get('/api/sekolah', async (req, res) => {
  const result = await pool.query(`
    SELECT s.sekolah_id, s.nama_sekolah, s.npsn, j.nama_jenjang,
           st.nama_status, a.nama_akreditasi, s.jumlah_siswa,
           s.jumlah_guru, s.alamat, k.nama_kecamatan,
           s.lokasi_lat, s.lokasi_lng, ku.nama_kurikulum,
           sp.keterangan as spp, s.jam_operasional, s.no_telepon,
           s.website, s.foto_url
    FROM sekolah s
    JOIN jenjang j ON s.jenjang_id = j.jenjang_id
    JOIN status st ON s.status_id = st.status_id
    JOIN akreditasi a ON s.akreditasi_id = a.akreditasi_id
    JOIN kecamatan k ON s.kecamatan_id = k.kecamatan_id
    JOIN kurikulum ku ON s.kurikulum_id = ku.kurikulum_id
    JOIN spp_kategori sp ON s.spp_id = sp.spp_id
    ORDER BY s.nama_sekolah
  `);
  res.json(result.rows);
});

// GET sekolah by ID
app.get('/api/sekolah/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM sekolah WHERE sekolah_id = $1', [req.params.id]);
  res.json(result.rows[0]);
});

// POST tambah sekolah
app.post('/api/sekolah', async (req, res) => {
  const { nama_sekolah, npsn, jenjang_id, status_id, akreditasi_id,
          jumlah_siswa, alamat, kecamatan_id, lokasi_lat, lokasi_lng,
          foto_url, jumlah_guru, kurikulum_id, spp_id,
          jam_operasional, no_telepon, website } = req.body;
  const result = await pool.query(`
    INSERT INTO sekolah (nama_sekolah, npsn, jenjang_id, status_id, akreditasi_id,
      jumlah_siswa, alamat, kecamatan_id, lokasi_lat, lokasi_lng, foto_url,
      jumlah_guru, kurikulum_id, spp_id, jam_operasional, no_telepon, website)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
    RETURNING *
  `, [nama_sekolah, npsn, jenjang_id, status_id, akreditasi_id,
      jumlah_siswa, alamat, kecamatan_id, lokasi_lat, lokasi_lng,
      foto_url, jumlah_guru, kurikulum_id, spp_id,
      jam_operasional, no_telepon, website]);
  res.json(result.rows[0]);
});

// PUT update sekolah
app.put('/api/sekolah/:id', async (req, res) => {
  const { nama_sekolah, npsn, jenjang_id, status_id, akreditasi_id,
          jumlah_siswa, alamat, kecamatan_id, lokasi_lat, lokasi_lng,
          foto_url, jumlah_guru, kurikulum_id, spp_id,
          jam_operasional, no_telepon, website } = req.body;
  const result = await pool.query(`
    UPDATE sekolah SET nama_sekolah=$1, npsn=$2, jenjang_id=$3, status_id=$4,
      akreditasi_id=$5, jumlah_siswa=$6, alamat=$7, kecamatan_id=$8,
      lokasi_lat=$9, lokasi_lng=$10, foto_url=$11, jumlah_guru=$12,
      kurikulum_id=$13, spp_id=$14, jam_operasional=$15, no_telepon=$16, website=$17
    WHERE sekolah_id=$18 RETURNING *
  `, [nama_sekolah, npsn, jenjang_id, status_id, akreditasi_id,
      jumlah_siswa, alamat, kecamatan_id, lokasi_lat, lokasi_lng,
      foto_url, jumlah_guru, kurikulum_id, spp_id,
      jam_operasional, no_telepon, website, req.params.id]);
  res.json(result.rows[0]);
});

// DELETE sekolah
app.delete('/api/sekolah/:id', async (req, res) => {
  await pool.query('DELETE FROM sekolah WHERE sekolah_id = $1', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// GET referensi dropdown
app.get('/api/jenjang', async (req, res) => {
  const r = await pool.query('SELECT * FROM jenjang ORDER BY jenjang_id');
  res.json(r.rows);
});
app.get('/api/status', async (req, res) => {
  const r = await pool.query('SELECT * FROM status ORDER BY status_id');
  res.json(r.rows);
});
app.get('/api/akreditasi', async (req, res) => {
  const r = await pool.query('SELECT * FROM akreditasi ORDER BY akreditasi_id');
  res.json(r.rows);
});
app.get('/api/kecamatan', async (req, res) => {
  const r = await pool.query('SELECT * FROM kecamatan ORDER BY kecamatan_id');
  res.json(r.rows);
});
app.get('/api/kurikulum', async (req, res) => {
  const r = await pool.query('SELECT * FROM kurikulum ORDER BY kurikulum_id');
  res.json(r.rows);
});
app.get('/api/spp-kategori', async (req, res) => {
  const r = await pool.query('SELECT * FROM spp_kategori ORDER BY spp_id');
  res.json(r.rows);
});

app.listen(3000, () => console.log('API running on port 3000'));
