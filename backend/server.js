const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware global ─────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth',    require('./src/routes/auth'));
app.use('/api/schools', require('./src/routes/schools'));

// ── Health check ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'GIS Sekolah Medan API berjalan!',
    endpoints: {
      auth:    ['POST /api/auth/register', 'POST /api/auth/login'],
      schools: [
        'GET    /api/schools',
        'GET    /api/schools/nearby?lat=&lng=&radius=&jenjang=',
        'GET    /api/schools/:id',
        'POST   /api/schools  (perlu login)',
        'PUT    /api/schools/:id  (perlu login)',
        'DELETE /api/schools/:id  (perlu login)',
      ]
    }
  });
});

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} tidak ditemukan.` });
});

// ── Start server ──────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);

  // Pastikan sekolah_id punya sequence auto-increment
  try {
    const pool = require('./src/db');
    await pool.query(`
      DO $$
      BEGIN
        -- Buat sequence jika belum ada
        IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE sequencename = 'sekolah_sekolah_id_seq') THEN
          CREATE SEQUENCE sekolah_sekolah_id_seq;
        END IF;
        -- Set nilai sequence ke MAX sekolah_id saat ini
        PERFORM setval('sekolah_sekolah_id_seq', COALESCE((SELECT MAX(sekolah_id) FROM sekolah), 0));
        -- Set DEFAULT kolom sekolah_id ke sequence
        ALTER TABLE sekolah ALTER COLUMN sekolah_id SET DEFAULT nextval('sekolah_sekolah_id_seq');
      END $$;
    `);
    console.log('Sequence sekolah_id berhasil dikonfigurasi.');
  } catch (err) {
    console.error('Gagal setup sequence sekolah_id:', err.message);
  }
});