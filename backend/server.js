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
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});