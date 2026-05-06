import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001/api'

const INIT = {
  nama_sekolah:'', npsn:'', jenjang:'', status:'', akreditasi:'',
  kurikulum:'', jam_operasional:'', kecamatan:'', alamat:'',
  jumlah_siswa:'', jumlah_guru:'', spp:'', no_telepon:'', website:'',
  has_lab_komputer:false, has_lab_ipa:false, has_perpustakaan:false,
  has_lapangan:false, has_musholla:false, has_kantin:false,
  ekskul:'', foto_url:'', lat:'', lng:''
}

export default function FormPage({ token, onLogout }) {
  const [form, setForm]       = useState(INIT)
  const [gpsStatus, setGPS]   = useState('idle') // idle | loading | done | error
  const [alert, setAlert]     = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const getGPS = () => {
    if (!navigator.geolocation) return setGPS('error')
    setGPS('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
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
    try {
      await axios.post(`${API}/schools`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAlert({ type:'success', msg:'Data sekolah berhasil disimpan!' })
      setForm(INIT)
      setGPS('idle')
    } catch (err) {
      setAlert({ type:'error', msg: err.response?.data?.message || 'Gagal menyimpan data.' })
    } finally {
      setLoading(false)
    }
  }

  const FASILITAS = [
    ['has_lab_komputer','Lab Komputer'],['has_lab_ipa','Lab IPA'],
    ['has_perpustakaan','Perpustakaan'],['has_lapangan','Lapangan'],
    ['has_musholla','Musholla'],['has_kantin','Kantin'],
  ]

  return (
    <>
      <div className="topbar">
        <h1>Input Data Sekolah</h1>
        <button className="logout-btn" onClick={onLogout}>Keluar</button>
      </div>

      <div style={{ padding:'16px', maxWidth:'520px', margin:'0 auto', paddingBottom:'40px' }}>
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.msg}
            <button onClick={() => setAlert(null)} style={{ float:'right', background:'none', border:'none', cursor:'pointer', fontSize:'16px' }}>×</button>
          </div>
        )}

        <form onSubmit={submit}>
          <p className="section-title">Identitas Sekolah</p>
          <div className="card">
            <div className="field">
              <label>Nama Sekolah *</label>
              <input value={form.nama_sekolah} onChange={e=>set('nama_sekolah',e.target.value)} placeholder="SMA Negeri 1 Medan" required />
            </div>
            <div className="row-2">
              <div className="field">
                <label>NPSN</label>
                <input value={form.npsn} onChange={e=>set('npsn',e.target.value)} placeholder="10210496" />
              </div>
              <div className="field">
                <label>Jenjang *</label>
                <select value={form.jenjang} onChange={e=>set('jenjang',e.target.value)} required>
                  <option value="">Pilih</option>
                  {['SD','SMP','SMA','SMK'].map(j=><option key={j}>{j}</option>)}
                </select>
              </div>
            </div>
            <div className="row-2">
              <div className="field">
                <label>Status</label>
                <select value={form.status} onChange={e=>set('status',e.target.value)}>
                  <option value="">Pilih</option>
                  <option>Negeri</option><option>Swasta</option>
                </select>
              </div>
              <div className="field">
                <label>Akreditasi</label>
                <select value={form.akreditasi} onChange={e=>set('akreditasi',e.target.value)}>
                  <option value="">Pilih</option>
                  {['A','B','C','Belum'].map(a=><option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="row-2">
              <div className="field">
                <label>Kurikulum</label>
                <select value={form.kurikulum} onChange={e=>set('kurikulum',e.target.value)}>
                  <option value="">Pilih</option>
                  <option>Merdeka</option><option>K-13</option>
                </select>
              </div>
              <div className="field">
                <label>Jam Operasional</label>
                <select value={form.jam_operasional} onChange={e=>set('jam_operasional',e.target.value)}>
                  <option value="">Pilih</option>
                  <option>Pagi</option><option>Siang</option><option>Fullday</option>
                </select>
              </div>
            </div>
          </div>

          <p className="section-title">Lokasi</p>
          <div className="card">
            <div className="field">
              <label>Kecamatan</label>
              <input value={form.kecamatan} onChange={e=>set('kecamatan',e.target.value)} placeholder="Medan Baru" />
            </div>
            <div className="field">
              <label>Alamat Lengkap</label>
              <textarea value={form.alamat} onChange={e=>set('alamat',e.target.value)} placeholder="Jl. Teuku Cik Ditiro No.1" />
            </div>
            <button type="button" className="btn btn-gps" onClick={getGPS} disabled={gpsStatus==='loading'}>
              {gpsStatus==='loading' ? '⏳ Mengambil lokasi...' : '📍 Ambil Koordinat GPS Otomatis'}
            </button>
            <div className={`coords-box ${gpsStatus==='done'?'got':''}`}>
              {gpsStatus==='idle'  && 'Tekan tombol untuk ambil koordinat GPS'}
              {gpsStatus==='loading' && 'Sedang mengambil posisi...'}
              {gpsStatus==='done' && `Lat: ${form.lat}  |  Lng: ${form.lng}`}
              {gpsStatus==='error' && 'Gagal ambil GPS. Isi manual di bawah.'}
            </div>
            {(gpsStatus==='error' || gpsStatus==='idle') && (
              <div className="row-2" style={{ marginTop:'10px' }}>
                <div className="field">
                  <label>Latitude *</label>
                  <input value={form.lat} onChange={e=>set('lat',e.target.value)} placeholder="3.5952" required />
                </div>
                <div className="field">
                  <label>Longitude *</label>
                  <input value={form.lng} onChange={e=>set('lng',e.target.value)} placeholder="98.6722" required />
                </div>
              </div>
            )}
          </div>

          <p className="section-title">Data Tambahan</p>
          <div className="card">
            <div className="row-2">
              <div className="field">
                <label>Jumlah Siswa</label>
                <input type="number" value={form.jumlah_siswa} onChange={e=>set('jumlah_siswa',e.target.value)} placeholder="0" />
              </div>
              <div className="field">
                <label>Jumlah Guru</label>
                <input type="number" value={form.jumlah_guru} onChange={e=>set('jumlah_guru',e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="field">
              <label>SPP (Rp/bulan, kosongkan jika gratis)</label>
              <input type="number" value={form.spp} onChange={e=>set('spp',e.target.value)} placeholder="0" />
            </div>
            <div className="row-2">
              <div className="field">
                <label>No. Telepon</label>
                <input value={form.no_telepon} onChange={e=>set('no_telepon',e.target.value)} placeholder="061-xxxxxx" />
              </div>
              <div className="field">
                <label>Website</label>
                <input value={form.website} onChange={e=>set('website',e.target.value)} placeholder="www.sman1medan.sch.id" />
              </div>
            </div>
          </div>

          <p className="section-title">Fasilitas</p>
          <div className="card">
            <div className="check-grid">
              {FASILITAS.map(([key, label]) => (
                <label key={key} className="check-item">
                  <input type="checkbox" checked={form[key]} onChange={e=>set(key,e.target.checked)} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <p className="section-title">Lainnya</p>
          <div className="card">
            <div className="field">
              <label>Ekstrakurikuler (pisahkan dengan koma)</label>
              <input value={form.ekskul} onChange={e=>set('ekskul',e.target.value)} placeholder="Pramuka, Futsal, Basket" />
            </div>
            <div className="field">
              <label>URL Foto Sekolah</label>
              <input value={form.foto_url} onChange={e=>set('foto_url',e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <button className="btn btn-success" type="submit" disabled={loading} style={{ marginTop:'20px' }}>
            {loading ? 'Menyimpan...' : 'Simpan Data Sekolah'}
          </button>
        </form>
      </div>
    </>
  )
}