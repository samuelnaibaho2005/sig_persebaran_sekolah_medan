# 🏫 SIG Pemetaan Zonasi Sekolah Kota Medan

<div align="center">

![Banner](https://img.shields.io/badge/Sistem%20Informasi%20Geografis-Pemetaan%20Zonasi%20Sekolah-2563eb?style=for-the-badge&logo=leaflet&logoColor=white)

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![PostGIS](https://img.shields.io/badge/PostGIS-3.4-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgis.net)
[![Flutter](https://img.shields.io/badge/Flutter-Mobile-02569B?style=flat-square&logo=flutter&logoColor=white)](https://flutter.dev)

**Tugas Proyek Mata Kuliah Sistem Informasi Geografis**  
Program Studi D-IV Teknologi Rekayasa Perangkat Lunak  
Politeknik Negeri Medan

[🗺️ Demo Web](#) · [📱 Repo Mobile](https://github.com/samuelnaibaho2005/sig_persebaran_sekolah_medan_mobile.git) · [📋 Laporan](#)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Cara Instalasi](#-cara-instalasi)
- [Menjalankan Proyek](#-menjalankan-proyek)
- [Endpoint API](#-endpoint-api)
- [Skema Database](#-skema-database)
- [Tim Pengembang](#-tim-pengembang)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Proyek

**SIG Pemetaan Zonasi Sekolah Kota Medan** adalah platform berbasis web dan mobile yang memvisualisasikan persebaran sekolah di Kota Medan secara interaktif. Sistem ini membantu masyarakat menemukan sekolah terbaik berdasarkan lokasi, jenjang, fasilitas, dan berbagai kriteria lainnya.

Proyek ini dibangun sebagai bagian dari tugas mata kuliah **Sistem Informasi Geografis** dengan mengimplementasikan tiga tipe vektor GIS (Point, Line, Polygon) menggunakan teknologi PostGIS dan Leaflet.js.

### Latar Belakang

Sistem zonasi sekolah yang diterapkan pemerintah seringkali menyulitkan orang tua dan siswa dalam menemukan sekolah terbaik yang dekat dengan tempat tinggal mereka. Platform ini hadir sebagai solusi berbasis data dan peta interaktif untuk mempermudah proses tersebut.

---

## ✨ Fitur Utama

### 🌐 Web Application
| Fitur | Deskripsi |
|-------|-----------|
| **Landing Page** | Halaman utama berisi ringkasan data, fitur sistem, dan profil tim |
| **Peta Interaktif** | Visualisasi marker sekolah berwarna per jenjang (SD/SMP/SMA/SMK/SLB) di OpenStreetMap |
| **Deteksi Lokasi** | Tombol "Lokasi Saya" untuk mendeteksi posisi user secara otomatis |
| **Radius Pencarian** | Slider radius untuk menyaring sekolah dalam jangkauan tertentu (Polygon) |
| **Jalur Rute** | Menampilkan jalur rute terbaik dari lokasi user ke sekolah menggunakan OSRM (Line) |
| **Filter Multi-Kriteria** | Filter berdasarkan jenjang, status (Negeri/Swasta), dan akreditasi |
| **Popup Detail** | Informasi lengkap sekolah termasuk foto (Cloudinary), fasilitas, ekskul, dan estimasi jarak |
| **Rekomendasi Terdekat** | Daftar sekolah terurut berdasarkan jarak dari lokasi user |

### 📱 Mobile Application (Flutter)
> 📌 Repo mobile tersedia di: [sig_persebaran_sekolah_medan_mobile](https://github.com/samuelnaibaho2005/sig_persebaran_sekolah_medan_mobile.git)

| Fitur | Deskripsi |
|-------|-----------|
| **Login Admin** | Autentikasi menggunakan Firebase Authentication |
| **Form Input Data** | Formulir lengkap untuk menambah data sekolah baru |
| **Koordinat GPS Otomatis** | Ambil koordinat lokasi sekolah langsung dari GPS perangkat |
| **Upload Foto** | Upload foto sekolah ke Cloudinary langsung dari kamera/galeri |
| **Dropdown Dinamis** | Opsi jenjang, status, akreditasi, dll diambil langsung dari database |

### 🔢 Implementasi Vektor GIS

```
POINT   → Marker posisi setiap sekolah (kolom GEOMETRY(Point, 4326) di PostGIS)
LINE    → Rute jalan dari lokasi user ke sekolah (OSRM Routing API)
POLYGON → Lingkaran radius pencarian dari lokasi user (ST_DWithin + Circle layer)
```

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────┐         ┌─────────────────────┐         ┌──────────────────┐
│   Flutter App   │ ──────► │   REST API          │ ──────► │   PostgreSQL     │
│   (Mobile)      │         │   Node.js + Express │         │   + PostGIS      │
└─────────────────┘         │   Port: 3001        │         │   gis_sekolah_   │
                            └──────────┬──────────┘         │   medan          │
┌─────────────────┐                   │                     └──────────────────┘
│   React Web     │ ──────────────────┘
│   (Landing +    │
│    Maps)        │         ┌─────────────────────┐
│   Port: 5174    │         │   Cloudinary CDN    │
└─────────────────┘         │   (Foto Sekolah)    │
                            └─────────────────────┘
```

**Alur Data:**
1. Admin input data sekolah via Flutter → POST ke REST API → disimpan di PostgreSQL
2. Web React fetch data dari REST API → render marker di Leaflet.js
3. User klik lokasi → query `ST_DWithin` ke PostGIS → tampilkan rekomendasi terdekat
4. User klik sekolah → OSRM API hitung rute → gambar polyline di peta

---

## 🛠️ Teknologi yang Digunakan

| Layer | Teknologi | Keterangan |
|-------|-----------|------------|
| **Frontend Web** | React.js 18 + Vite | Landing page & peta interaktif |
| **Peta** | Leaflet.js + react-leaflet | Render peta OpenStreetMap |
| **Routing** | OSRM (Open Source Routing Machine) | Jalur rute via jalan nyata, gratis |
| **Mobile** | Flutter (Android) | Input data sekolah oleh admin |
| **Auth Mobile** | Firebase Authentication | Login admin di aplikasi Flutter |
| **Backend** | Node.js + Express.js | REST API penghubung web/mobile ke database |
| **Database** | PostgreSQL 15+ | Penyimpanan data utama |
| **Spasial** | PostGIS 3.4 | Query geografis (jarak, radius, koordinat) |
| **Storage Foto** | Cloudinary | CDN untuk foto sekolah |
| **HTTP Client** | Axios (Web) / http (Flutter) | Pemanggilan REST API |

---

## 📁 Struktur Proyek

```
sig-pemetaan-sekolah-medan/
│
├── 📂 backend/                    # REST API (Node.js + Express)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── schools.js         # Endpoint CRUD sekolah + spasial
│   │   │   └── auth.js            # Endpoint login/register admin
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT middleware
│   │   └── db.js                  # Koneksi PostgreSQL
│   ├── .env                       # Konfigurasi (tidak di-commit)
│   ├── .env.example               # Template konfigurasi
│   ├── server.js                  # Entry point server
│   └── package.json
│
├── 📂 web-maps/                   # Frontend React (Web + Landing Page)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx    # Halaman utama / beranda
│   │   │   └── MapsPage.jsx       # Halaman peta interaktif
│   │   ├── App.jsx                # Router (React Router DOM)
│   │   ├── index.css              # Global styles
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── 📂 database/                   # File SQL
│   ├── schema.sql                 # DDL: CREATE TABLE, index, view
│   ├── insert_sekolah.sql         # Data 99 sekolah Kota Medan
│   ├── migration_view.sql         # CREATE VIEW v_sekolah_lengkap
│   └── update_koordinat.sql       # UPDATE koordinat PostGIS
│
└── README.md
```

> 📱 **Repo Mobile (Flutter):** [github.com/samuelnaibaho2005/sig_persebaran_sekolah_medan_mobile](https://github.com/samuelnaibaho2005/sig_persebaran_sekolah_medan_mobile.git)

---

## ✅ Prasyarat

Pastikan sudah terinstall:

- **Node.js** ≥ 18.0 → [nodejs.org](https://nodejs.org)
- **PostgreSQL** ≥ 15 + **PostGIS** ≥ 3.4 → [postgresql.org](https://postgresql.org) + [postgis.net](https://postgis.net)
- **pgAdmin 4** → untuk manajemen database via GUI
- **Git** → untuk clone repo

Cek instalasi:
```bash
node --version    # v18.x.x
npm --version     # 9.x.x
psql --version    # psql (PostgreSQL) 15.x
```

---

## 🚀 Cara Instalasi

### 1. Clone Repositori

```bash
git clone https://github.com/samuelnaibaho2005/sig_persebaran_sekolah_medan_mobile.git
cd sig-pemetaan-sekolah-medan
```

### 2. Setup Database

Buka **pgAdmin 4**, buat database baru bernama `gis_sekolah_medan`, lalu jalankan file SQL berikut secara berurutan di Query Tool:

```sql
-- Langkah 1: Aktifkan PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Langkah 2: Buat semua tabel (jalankan schema.sql)
-- Langkah 3: Insert data sekolah (jalankan insert_sekolah.sql)
-- Langkah 4: Buat view (jalankan migration_view.sql)
-- Langkah 5: Update koordinat (jalankan update_koordinat.sql)
```

Atau import sekaligus via terminal:
```bash
psql -U postgres -d gis_sekolah_medan -f database/schema.sql
psql -U postgres -d gis_sekolah_medan -f database/insert_sekolah.sql
psql -U postgres -d gis_sekolah_medan -f database/migration_view.sql
```

### 3. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` (salin dari `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` sesuai konfigurasi lokal:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gis_sekolah_medan
DB_USER=postgres
DB_PASSWORD=password_anda

JWT_SECRET=gis_sekolah_medan_secret_key
PORT=3001
```

### 4. Setup Web

```bash
cd web-maps
npm install
```

---

## ▶️ Menjalankan Proyek

Buka **3 terminal** secara bersamaan:

**Terminal 1 — Backend API:**
```bash
cd backend
npm run dev
# ✅ Server berjalan di http://localhost:3001
# ✅ Terhubung ke PostgreSQL
```

**Terminal 2 — Web (Landing Page + Maps):**
```bash
cd web-maps
npm run dev
# ✅ Buka http://localhost:5174
```

**Terminal 3 — Daftarkan Admin (sekali saja):**
```bash
# Gunakan Thunder Client / Postman
# POST http://localhost:3001/api/auth/register
# Body: { "username": "admin", "password": "admin123" }
```

> 📱 Untuk menjalankan aplikasi Flutter, lihat panduan di [Repo Mobile](https://github.com/samuelnaibaho2005/sig_persebaran_sekolah_medan_mobile.git)

---

## 📡 Endpoint API

Base URL: `http://localhost:3001`

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/schools` | Semua sekolah, support filter | ❌ |
| `GET` | `/api/schools/nearby` | Sekolah terdekat dari koordinat user | ❌ |
| `GET` | `/api/schools/:id` | Detail satu sekolah | ❌ |
| `GET` | `/api/schools/options` | Data dropdown (jenjang, status, dll) | ❌ |
| `POST` | `/api/schools` | Tambah sekolah baru | ✅ JWT |
| `PUT` | `/api/schools/:id` | Update data sekolah | ✅ JWT |
| `DELETE` | `/api/schools/:id` | Hapus sekolah | ✅ JWT |
| `POST` | `/api/auth/register` | Daftarkan admin baru | ❌ |
| `POST` | `/api/auth/login` | Login admin, dapat JWT token | ❌ |

**Contoh request filter:**
```
GET /api/schools?jenjang=SMA&status=Negeri&akreditasi=A
GET /api/schools/nearby?lat=3.5952&lng=98.6722&radius=3&jenjang=SMP
```

---

## 🗃️ Skema Database

Database dinormalisasi ke **3NF** dengan tabel-tabel berikut:

```
┌──────────────┐    ┌─────────┐    ┌────────────┐
│   sekolah    │───►│ jenjang │    │   status   │
│  (main table)│───►│  (FK)   │    │   (FK)     │
│              │───►└─────────┘    └────────────┘
│  lokasi      │
│  GEOMETRY    │───►┌─────────────────┐
│  (Point,4326)│    │ fasilitas_sekolah│
└──────────────┘    │ (1:1 relation)  │
       │            └─────────────────┘
       │            ┌──────────────────┐
       └───────────►│  sekolah_ekskul  │──►┌────────┐
                    │ (M:M junction)   │   │ ekskul │
                    └──────────────────┘   └────────┘
```

**Fungsi PostGIS yang digunakan:**

| Fungsi | Kegunaan |
|--------|----------|
| `ST_SetSRID(ST_MakePoint(lng, lat), 4326)` | Insert koordinat sebagai POINT |
| `ST_Distance(a::geography, b::geography)` | Hitung jarak akurat antar dua titik (meter) |
| `ST_DWithin(a::geography, b::geography, meter)` | Filter sekolah dalam radius tertentu |
| `<->` operator | KNN: cari titik terdekat menggunakan GIST index |
| `ST_AsGeoJSON(geom)` | Konversi geometry ke format GeoJSON |

---

## 👥 Tim Pengembang

| Nama | Peran | Tanggung Jawab |
|------|-------|----------------|
| **Bagas** | Mobile Developer | Membangun aplikasi Flutter untuk input data sekolah |
| **Samuel** | Web Developer | Membangun landing page dan web maps interaktif |
| **Fajar** | Data Collector & DB Designer | Mengumpulkan data sekolah dan merancang skema database |
| **Partogi** | Database Designer | Normalisasi database dan implementasi PostGIS |
| **Ria** | Data Collector & Dokumentasi | Pengumpulan data lapangan dan dokumentasi proyek |
| **Dilla** | Sistem Analis | Analisis kebutuhan sistem dan perancangan arsitektur |

---

## 📊 Sumber Data

Data sekolah bersumber dari:
- **DAPODIK** (Data Pokok Pendidikan) — Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi
- **referensi.data.kemdikbud.go.id** — Portal referensi data pendidikan
- Wilayah studi kasus: **Kecamatan Medan Kota, Kota Medan, Sumatera Utara**

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademis sebagai tugas mata kuliah Sistem Informasi Geografis, Program Studi D-IV TRPL, Politeknik Negeri Medan.

---

<div align="center">

**Dibuat dengan ❤️ oleh Tim SIG Sekolah Medan**  
Politeknik Negeri Medan · 2025

</div>
