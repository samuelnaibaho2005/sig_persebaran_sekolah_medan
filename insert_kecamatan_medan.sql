-- ================================================================
-- INSERT data Kecamatan di Kota Medan
-- Menambahkan 21 kecamatan ke tabel kecamatan
-- ================================================================

-- Hapus data lama jika ada (opsional)
-- DELETE FROM kecamatan WHERE kecamatan_id > 1;

-- Insert data kecamatan
INSERT INTO kecamatan (nama_kecamatan) VALUES
('Medan Amplas'),
('Medan Area'),
('Medan Barat'),
('Medan Baru'),
('Medan Belawan'),
('Medan Deli'),
('Medan Denai'),
('Medan Helvetia'),
('Medan Johor'),
('Medan Kota'),
('Medan Labuhan'),
('Medan Maimun'),
('Medan Marelan'),
('Medan Perjuangan'),
('Medan Petisah'),
('Medan Polonia'),
('Medan Selayang'),
('Medan Sunggal'),
('Medan Tembung'),
('Medan Timur'),
('Medan Tuntungan')
ON CONFLICT DO NOTHING;

-- Verify data
SELECT COUNT(*) as total FROM kecamatan;
