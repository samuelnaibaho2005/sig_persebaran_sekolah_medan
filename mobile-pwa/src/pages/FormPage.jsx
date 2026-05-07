import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001/api'

const FASILITAS_LIST = [
  ['has_lab_komputer', 'Lab Komputer'],
  ['has_lab_ipa',      'Lab IPA'],
  ['has_perpustakaan', 'Perpustakaan'],
  ['has_lapangan',     'Lapangan'],
  ['has_musholla',     'Musholla'],
  ['has_kantin',       'Kantin'],
]

const INIT_FORM = {
  nama_sekolah: '', npsn: '', jenjang: '', status: '', akreditasi: '',
  kurikulum: '', kecamatan: '', spp_id: '', jumlah_siswa: '', jumlah_guru: '',
  alamat: '', jam_operasional: 'Pagi', no_telepon: '', website: '', foto_url: '',
  lat: '', lng: '',
  has_lab_komputer: false, has_lab_ipa: false, has_perpustakaan: false,
  has_lapangan: false, has_musholla: false, has_kantin: false,
  ekskul: []   // array ekskul_id yang dipilih
}

export default function FormPage({ token, onLogout }) {
  const [form, setForm]       = useState(INIT_FORM)
  const [options, setOptions] = useState(null)   // data lookup dari /api/schools/options
  const [gpsStatus, setGPS]   = useState('idle')
  const [alert, setAlert]     = useState(null)
  const [loading, setLoading] = useState(false)

  // Ambil semua opsi dropdown dari backend saat pertama load
  useEffect(() => {
    axios.get(`${API}/schools/options`)
      .then(r => setOptions(r.data.data))
      .catch(() => setAlert({ type: 'error', msg: 'Gagal memuat opsi form. Cek koneksi ke backend.' }))
  }, [])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  // Toggle ekskul (tambah/hapus dari array)
  const toggleEkskul = (id) => {
    setForm(f => ({
      ...f,
      ekskul: f.ekskul.includes(id)
        ? f.ekskul.filter(e => e !== id)
        : [...f.ekskul, id]
    }))
  }

  const getGPS = () => {
    if (!navigator.geolocation) return setGPS('error')
    setGPS('loading')
    navigator.geolocation.getCurrentPosition(
      pos => {
        set('lat', pos.coords.latitude.toFixed(6))
        set('lng', pos.coords.longitude.toFixed(6))
        setGPS('done')
      },
      () => setGPS('error')
    )
  }

  const submit = async (e) => {
    e.preventDefault()
    setAlert(null)
    setLoading(true)

    // Siapkan payload — kirim nama ekskul (bukan ID) agar backend bisa lookup
    const ekskulNames = options
      ? form.ekskul.map(id => {
          const found = options.ekskul.find(e => e.id === id)
          return found ? found.nama : null
        }).filter(Boolean)
      : []

    const payload = { ...form, ekskul: ekskulNames }

    try {
      await axios.post(`${API}/schools`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAlert({ type: 'success', msg: 'Data sekolah berhasil disimpan!' })
      setForm(INIT_FORM)
      setGPS('idle')
    } catch (err) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Gagal menyimpan data.' })
    } finally {
      setLoading(false)
    }
  }

  if (!options) return (
    <div style={{ display: 'flex', height: '100dvh', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
      Memuat form...
    </div>
  )

  return (
    <>
      <div className="topbar">
        <h1>Input Data Sekolah</h1>
        <button className="logout-btn" onClick={onLogout}>Keluar</button>
      </div>

      <div style={{ padding: '16px', maxWidth: '520px', margin: '0 auto', paddingBottom: '40px' }}>
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.msg}
            <button onClick={() => setAlert(null)} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>×</button>
          </div>
        )}

        <form onSubmit={submit}>
          {/* ── Identitas Sekolah ── */}
          <p className="section-title">Identitas Sekolah</p>
          <div className="card">
            <div className="field">
              <label>Nama Sekolah *</label>
              <input value={form.nama_sekolah} onChange={e => set('nama_sekolah', e.target.value)}
                placeholder="SMA Negeri 5 Medan" required />
            </div>

            <div className="row-2">
              <div className="field">
                <label>NPSN</label>
                <input value={form.npsn} onChange={e => set('npsn', e.target.value)} placeholder="10xxxxxx" />
              </div>
              <div className="field">
                <label>Jenjang *</label>
                <select value={form.jenjang} onChange={e => set('jenjang', e.target.value)} required>
                  <option value="">Pilih</option>
                  {options.jenjang.map(o => <option key={o.id} value={o.nama}>{o.nama}</option>)}
                </select>
              </div>
            </div>

            <div className="row-2">
              <div className="field">
                <label>Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)}>
                  <option value="">Pilih</option>
                  {options.status.map(o => <option key={o.id} value={o.nama}>{o.nama}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Akreditasi</label>
                <select value={form.akreditasi} onChange={e => set('akreditasi', e.target.value)}>
                  <option value="">Pilih</option>
                  {options.akreditasi.map(o => <option key={o.id} value={o.nama}>{o.nama}</option>)}
                </select>
              </div>
            </div>

            <div className="row-2">
              <div className="field">
                <label>Kurikulum</label>
                <select value={form.kurikulum} onChange={e => set('kurikulum', e.target.value)}>
                  <option value="">Pilih</option>
                  {options.kurikulum.map(o => <option key={o.id} value={o.nama}>{o.nama}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Jam Operasional</label>
                <select value={form.jam_operasional} onChange={e => set('jam_operasional', e.target.value)}>
                  <option>Pagi</option><option>Siang</option><option>Fullday</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Lokasi ── */}
          <p className="section-title">Lokasi</p>
          <div className="card">
            <div className="field">
              <label>Kecamatan</label>
              <select value={form.kecamatan} onChange={e => set('kecamatan', e.target.value)}>
                <option value="">Pilih</option>
                {options.kecamatan.map(o => <option key={o.id} value={o.nama}>{o.nama}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Alamat Lengkap</label>
              <textarea value={form.alamat} onChange={e => set('alamat', e.target.value)}
                placeholder="Jl. Pelajar No.17, Teladan Timur" />
            </div>

            <button type="button" className="btn btn-gps" onClick={getGPS} disabled={gpsStatus === 'loading'}>
              {gpsStatus === 'loading' ? '⏳ Mengambil lokasi...' : '📍 Ambil Koordinat GPS Otomatis'}
            </button>
            <div className={`coords-box ${gpsStatus === 'done' ? 'got' : ''}`}>
              {gpsStatus === 'idle'    && 'Tekan tombol untuk ambil koordinat GPS'}
              {gpsStatus === 'loading' && 'Sedang mengambil posisi...'}
              {gpsStatus === 'done'   && `Lat: ${form.lat}  |  Lng: ${form.lng}`}
              {gpsStatus === 'error'  && 'Gagal ambil GPS. Isi manual di bawah.'}
            </div>

            {(gpsStatus === 'error' || gpsStatus === 'idle') && (
              <div className="row-2" style={{ marginTop: '10px' }}>
                <div className="field">
                  <label>Latitude *</label>
                  <input value={form.lat} onChange={e => set('lat', e.target.value)} placeholder="3.5952" required />
                </div>
                <div className="field">
                  <label>Longitude *</label>
                  <input value={form.lng} onChange={e => set('lng', e.target.value)} placeholder="98.6722" required />
                </div>
              </div>
            )}
          </div>

          {/* ── Data Tambahan ── */}
          <p className="section-title">Data Tambahan</p>
          <div className="card">
            <div className="row-2">
              <div className="field">
                <label>Jumlah Siswa</label>
                <input type="number" value={form.jumlah_siswa} onChange={e => set('jumlah_siswa', e.target.value)} placeholder="0" />
              </div>
              <div className="field">
                <label>Jumlah Guru</label>
                <input type="number" value={form.jumlah_guru} onChange={e => set('jumlah_guru', e.target.value)} placeholder="0" />
              </div>
            </div>

            <div className="field">
              <label>Kategori SPP</label>
              <select value={form.spp_id} onChange={e => set('spp_id', e.target.value)}>
                <option value="">Pilih</option>
                {options.spp.map(o => <option key={o.id} value={o.id}>{o.nama}</option>)}
              </select>
            </div>

            <div className="row-2">
              <div className="field">
                <label>No. Telepon</label>
                <input value={form.no_telepon} onChange={e => set('no_telepon', e.target.value)} placeholder="061-xxxxxx" />
              </div>
              <div className="field">
                <label>Website</label>
                <input value={form.website} onChange={e => set('website', e.target.value)} placeholder="www.sman5medan.sch.id" />
              </div>
            </div>

            <div className="field">
              <label>URL Foto (Cloudinary)</label>
              <input value={form.foto_url} onChange={e => set('foto_url', e.target.value)} placeholder="https://res.cloudinary.com/..." />
            </div>
          </div>

          {/* ── Fasilitas ── */}
          <p className="section-title">Fasilitas</p>
          <div className="card">
            <div className="check-grid">
              {FASILITAS_LIST.map(([key, label]) => (
                <label key={key} className="check-item">
                  <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* ── Ekskul (dari DB — dinamis) ── */}
          <p className="section-title">Ekstrakurikuler</p>
          <div className="card">
            <div className="check-grid">
              {options.ekskul.map(e => (
                <label key={e.id} className="check-item">
                  <input type="checkbox"
                    checked={form.ekskul.includes(e.id)}
                    onChange={() => toggleEkskul(e.id)} />
                  {e.nama}
                </label>
              ))}
            </div>
          </div>

          <button className="btn btn-success" type="submit" disabled={loading} style={{ marginTop: '20px' }}>
            {loading ? 'Menyimpan...' : 'Simpan Data Sekolah'}
          </button>
        </form>
      </div>
    </>
  )
}