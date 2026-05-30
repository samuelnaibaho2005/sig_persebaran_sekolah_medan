-- ================================================================
-- CREATE VIEW v_sekolah_lengkap
-- View untuk menggabungkan data sekolah dengan semua lookup tables
-- Digunakan oleh backend API untuk query sekolah
-- ================================================================

CREATE OR REPLACE VIEW v_sekolah_lengkap AS
SELECT
    s.sekolah_id AS id,
    s.nama_sekolah,
    s.npsn,
    j.nama_jenjang AS jenjang,
    st.nama_status AS status,
    a.nama_akreditasi AS akreditasi,
    k.nama_kurikulum AS kurikulum,
    kc.nama_kecamatan AS kecamatan,
    s.jumlah_siswa,
    s.alamat,
    s.lokasi_lat AS lat,
    s.lokasi_lng AS lng,
    s.foto_url,
    s.jumlah_guru,
    COALESCE(sp.spp_min, 0) AS spp,
    s.jam_operasional,
    -- Fasilitas
    COALESCE(fs.has_lab_komputer, false) AS has_lab_komputer,
    COALESCE(fs.has_perpustakaan, false) AS has_perpustakaan,
    COALESCE(fs.has_lapangan, false) AS has_lapangan,
    COALESCE(fs.has_lab_ipa, false) AS has_lab_ipa,
    COALESCE(fs.has_musholla, false) AS has_musholla,
    COALESCE(fs.has_kantin, false) AS has_kantin,
    -- PostGIS geometry untuk query spatial
    ST_MakePoint(s.lokasi_lng, s.lokasi_lat) AS lokasi,
    -- Array ekskul
    COALESCE(
        array_agg(e.nama_ekskul ORDER BY e.nama_ekskul) FILTER (WHERE e.nama_ekskul IS NOT NULL),
        ARRAY[]::text[]
    ) AS ekskul
FROM public.sekolah s
    LEFT JOIN public.jenjang j          ON s.jenjang_id = j.jenjang_id
    LEFT JOIN public.status st          ON s.status_id = st.status_id
    LEFT JOIN public.akreditasi a       ON s.akreditasi_id = a.akreditasi_id
    LEFT JOIN public.kurikulum k        ON s.kurikulum_id = k.kurikulum_id
    LEFT JOIN public.kecamatan kc       ON s.kecamatan_id = kc.kecamatan_id
    LEFT JOIN public.spp_kategori sp    ON s.spp_id = sp.spp_id
    LEFT JOIN public.fasilitas_sekolah fs ON s.sekolah_id = fs.sekolah_id
    LEFT JOIN public.sekolah_ekskul se  ON s.sekolah_id = se.sekolah_id
    LEFT JOIN public.ekskul e           ON se.ekskul_id = e.ekskul_id
GROUP BY
    s.sekolah_id, s.nama_sekolah, s.npsn, j.nama_jenjang, st.nama_status,
    a.nama_akreditasi, k.nama_kurikulum, kc.nama_kecamatan, s.jumlah_siswa,
    s.alamat, s.lokasi_lat, s.lokasi_lng, s.foto_url, s.jumlah_guru,
    sp.spp_min, s.jam_operasional, fs.sekolah_id,
    fs.has_lab_komputer, fs.has_perpustakaan, fs.has_lapangan,
    fs.has_lab_ipa, fs.has_musholla, fs.has_kantin
ORDER BY s.nama_sekolah;
