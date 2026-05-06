import { useState, useEffect, useRef } from 'react'
import {
  MapContainer, TileLayer, Marker, Popup,
  Circle, Polyline, useMap
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

const API = 'http://localhost:3001/api'

// ── Fix icon Leaflet ───────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const COLORS = { SD: '#16a34a', SMP: '#2563eb', SMA: '#db2777', SMK: '#d97706' }

function makeIcon(jenjang, isActive = false) {
  const c = COLORS[jenjang] || '#64748b'
  const size = isActive ? 36 : 28
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      border-radius:50% 50% 50% 0;
      background:${c};border:2px solid #fff;
      box-shadow:0 2px 8px rgba(0,0,0,${isActive ? '0.55' : '0.3'});
      transform:rotate(-45deg);transition:all .2s">
    </div>`,
    iconSize: [size, size], iconAnchor: [size / 2, size], popupAnchor: [0, -size]
  })
}

const userIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:20px;height:20px;border-radius:50%;
    background:#2563eb;border:3px solid #fff;
    box-shadow:0 0 0 4px rgba(37,99,235,0.3)">
  </div>`,
  iconSize: [20, 20], iconAnchor: [10, 10]
})

// ── Fly to koordinat ───────────────────────────────────────────
function FlyTo({ coords }) {
  const map = useMap()
  useEffect(() => {
    if (coords) map.flyTo(coords, 15, { duration: 1.2 })
  }, [coords])
  return null
}

// ── Fit map ke bounds rute ─────────────────────────────────────
function FitRoute({ routeCoords, userPos }) {
  const map = useMap()
  useEffect(() => {
    if (routeCoords && routeCoords.length > 0 && userPos) {
      const bounds = L.latLngBounds([userPos, ...routeCoords])
      map.fitBounds(bounds, { padding: [60, 60], animate: true, duration: 1 })
    }
  }, [routeCoords])
  return null
}

// ── Haversine (sebagai fallback jika OSRM gagal) ───────────────
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2))
}

// ── Ambil rute dari OSRM ───────────────────────────────────────
async function fetchRoute(fromLat, fromLng, toLat, toLng) {
  try {
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${fromLng},${fromLat};${toLng},${toLat}` +
      `?overview=full&geometries=geojson`
    const res = await fetch(url)
    const data = await res.json()
    if (data.code === 'Ok' && data.routes[0]) {
      const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])
      const distanceKm = (data.routes[0].distance / 1000).toFixed(2)
      const durationMin = Math.ceil(data.routes[0].duration / 60)
      return { coords, distanceKm, durationMin, source: 'osrm' }
    }
  } catch (_) { /* fallback */ }
  // fallback: garis lurus jika OSRM gagal
  const distanceKm = haversine(fromLat, fromLng, toLat, toLng)
  return {
    coords: [[fromLat, fromLng], [toLat, toLng]],
    distanceKm,
    durationMin: Math.ceil(distanceKm / 0.5),   // estimasi jalan kaki ~30 km/h
    source: 'straight'
  }
}

// ── Popup Sekolah dengan info rute ─────────────────────────────
function SchoolPopup({ s, userPos, routeInfo, routeLoading }) {
  const [imgError, setImgError] = useState(false)

  const fasilitas = [
    s.has_lab_komputer && 'Lab Komputer',
    s.has_lab_ipa      && 'Lab IPA',
    s.has_perpustakaan && 'Perpustakaan',
    s.has_lapangan     && 'Lapangan',
    s.has_musholla     && 'Musholla',
    s.has_kantin       && 'Kantin',
  ].filter(Boolean)

  return (
    <div style={{ minWidth: '230px', maxWidth: '270px', fontFamily: 'system-ui, sans-serif', fontSize: '13px' }}>

      {/* Foto */}
      {s.foto_url && !imgError ? (
        <div style={{ margin: '-6px -14px 10px', borderRadius: '6px 6px 0 0', overflow: 'hidden', height: '140px' }}>
          <img src={s.foto_url} alt={s.nama_sekolah} onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <div style={{ margin: '-6px -14px 10px', height: '55px', background: '#f1f5f9',
          borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '24px' }}>🏫</div>
      )}

      {/* Nama & badge jenjang */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginBottom: 8 }}>
        <strong style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.3, flex: 1 }}>
          {s.nama_sekolah}
        </strong>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap',
          background: s.jenjang === 'SD' ? '#dcfce7' : s.jenjang === 'SMP' ? '#dbeafe' :
                      s.jenjang === 'SMA' ? '#fce7f3' : '#fef3c7',
          color:      s.jenjang === 'SD' ? '#166534' : s.jenjang === 'SMP' ? '#1e40af' :
                      s.jenjang === 'SMA' ? '#9d174d' : '#92400e',
        }}>{s.jenjang}</span>
      </div>

      {/* Info sekolah */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
        <tbody>
          {[
            ['Status',     s.status],
            ['Akreditasi', s.akreditasi],
            ['Kurikulum',  s.kurikulum],
            ['Kecamatan',  s.kecamatan],
            ['Alamat',     s.alamat],
            ['Siswa',      s.jumlah_siswa ? `${s.jumlah_siswa.toLocaleString('id-ID')} orang` : null],
            ['Guru',       s.jumlah_guru  ? `${s.jumlah_guru} orang` : null],
            ['SPP',        s.spp > 0 ? `Rp ${parseInt(s.spp).toLocaleString('id-ID')}/bln` : 'Gratis'],
            ['Telp',       s.no_telepon],
          ].filter(([, v]) => v).map(([label, val]) => (
            <tr key={label}>
              <td style={{ color: '#94a3b8', width: 80, fontSize: 12, verticalAlign: 'top', paddingBottom: 2 }}>{label}</td>
              <td style={{ color: '#475569', fontSize: 12, paddingBottom: 2 }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Fasilitas */}
      {fasilitas.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, marginBottom: 4 }}>FASILITAS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {fasilitas.map(f => (
              <span key={f} style={{ fontSize: 10, background: '#f0fdf4', color: '#166534',
                border: '1px solid #bbf7d0', borderRadius: 999, padding: '1px 7px' }}>{f}</span>
            ))}
          </div>
        </div>
      )}

      {/* Ekskul */}
      {s.ekskul && s.ekskul.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, marginBottom: 4 }}>EKSKUL</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {s.ekskul.map(e => (
              <span key={e} style={{ fontSize: 10, background: '#eff6ff', color: '#1e40af',
                border: '1px solid #bfdbfe', borderRadius: 999, padding: '1px 7px' }}>{e}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── INFO RUTE (LINE VECTOR) ─────────────────── */}
      {!userPos ? (
        <div style={{ marginTop: 8, padding: '8px 10px', background: '#fef9c3',
          borderRadius: 8, fontSize: 12, color: '#854d0e', border: '1px solid #fde68a' }}>
          📍 Aktifkan <strong>Lokasi Saya</strong> untuk melihat jalur rute
        </div>
      ) : routeLoading ? (
        <div style={{ marginTop: 8, padding: '8px 10px', background: '#eff6ff',
          borderRadius: 8, fontSize: 12, color: '#1e40af', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
          Menghitung jalur rute...
        </div>
      ) : routeInfo ? (
        <div style={{ marginTop: 8, background: '#eff6ff', borderRadius: 8,
          border: '1.5px solid #bfdbfe', overflow: 'hidden' }}>
          <div style={{ background: '#2563eb', padding: '6px 10px',
            fontSize: 11, fontWeight: 600, color: '#fff', display: 'flex',
            alignItems: 'center', gap: 6 }}>
            🗺️ JALUR RUTE TERBAIK
            {routeInfo.source === 'straight' &&
              <span style={{ fontSize: 9, opacity: 0.8 }}>(garis lurus)</span>}
          </div>
          <div style={{ padding: '8px 10px', display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#2563eb' }}>
                {routeInfo.distanceKm}
              </div>
              <div style={{ fontSize: 10, color: '#64748b' }}>kilometer</div>
            </div>
            <div style={{ width: 1, background: '#bfdbfe' }}></div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#7c3aed' }}>
                ~{routeInfo.durationMin}
              </div>
              <div style={{ fontSize: 10, color: '#64748b' }}>menit berkendara</div>
            </div>
          </div>
          <div style={{ padding: '0 10px 8px', fontSize: 11, color: '#475569', textAlign: 'center' }}>
            Jalur ditampilkan di peta dengan garis biru
          </div>
        </div>
      ) : null}

    </div>
  )
}

// ── Komponen InfoPanel rute (di atas peta) ─────────────────────
function RoutePanel({ routeInfo, schoolName, onClose }) {
  if (!routeInfo) return null
  return (
    <div style={{
      position: 'absolute', top: 12, right: 12, zIndex: 1000,
      background: '#fff', border: '1.5px solid #bfdbfe', borderRadius: 12,
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)', padding: '12px 16px',
      minWidth: 220, maxWidth: 280
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          🗺️ Rute ke Sekolah
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer',
          color: '#94a3b8', fontSize: 16, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', marginBottom: 10, lineHeight: 1.3 }}>
        {schoolName}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, background: '#eff6ff', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#2563eb' }}>{routeInfo.distanceKm}</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>km</div>
        </div>
        <div style={{ flex: 1, background: '#f5f3ff', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#7c3aed' }}>~{routeInfo.durationMin}</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>menit</div>
        </div>
      </div>
      {routeInfo.source === 'straight' && (
        <div style={{ marginTop: 8, fontSize: 10, color: '#f59e0b', textAlign: 'center' }}>
          ⚠ Jalur perkiraan (garis lurus) — koneksi OSRM timeout
        </div>
      )}
    </div>
  )
}

// ── App utama ──────────────────────────────────────────────────
export default function App() {
  const [schools, setSchools]         = useState([])
  const [filters, setFilters]         = useState({ jenjang: '', status: '', akreditasi: '' })
  const [radius, setRadius]           = useState(3)
  const [userPos, setUserPos]         = useState(null)
  const [flyTo, setFlyTo]             = useState(null)
  const [activeId, setActiveId]       = useState(null)
  const [gpsLoad, setGpsLoad]         = useState(false)

  // State rute (LINE VECTOR)
  const [routeCoords, setRouteCoords] = useState(null)   // array [lat,lng] untuk Polyline
  const [routeInfo, setRouteInfo]     = useState(null)   // { distanceKm, durationMin, source }
  const [routeLoading, setRouteLoad]  = useState(false)
  const [activeSchool, setActiveSchool] = useState(null) // objek sekolah yang aktif

  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }))

  useEffect(() => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    axios.get(`${API}/schools`, { params }).then(r => setSchools(r.data.data))
  }, [filters])

  const displayed = schools.map(s => ({
    ...s,
    jarak: userPos ? haversine(userPos[0], userPos[1], s.lat, s.lng) : null
  })).filter(s => userPos ? s.jarak <= radius : true)
    .sort((a, b) => a.jarak !== null ? a.jarak - b.jarak : 0)

  const getMyLocation = () => {
    setGpsLoad(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const c = [pos.coords.latitude, pos.coords.longitude]
        setUserPos(c); setFlyTo(c); setGpsLoad(false)
        // Reset rute jika posisi berubah
        setRouteCoords(null); setRouteInfo(null); setActiveSchool(null)
      },
      () => { alert('Tidak bisa mengambil lokasi. Aktifkan GPS.'); setGpsLoad(false) }
    )
  }

  // ── Klik sekolah: tampilkan popup + gambar rute ──────────────
  const handleSchoolClick = async (s) => {
    setActiveId(s.id)
    setFlyTo([s.lat, s.lng])
    setActiveSchool(s)

    if (!userPos) {
      setRouteCoords(null)
      setRouteInfo(null)
      return
    }

    // Hapus rute lama, tampilkan loading
    setRouteCoords(null)
    setRouteInfo(null)
    setRouteLoad(true)

    const result = await fetchRoute(userPos[0], userPos[1], s.lat, s.lng)
    setRouteLoad(false)
    if (result) {
      setRouteCoords(result.coords)
      setRouteInfo(result)
    }
  }

  const clearRoute = () => {
    setRouteCoords(null)
    setRouteInfo(null)
    setActiveId(null)
    setActiveSchool(null)
  }

  return (
    <div id="root">
      {/* ── Topbar ── */}
      <div className="topbar">
        <h1>🏫 Peta Sekolah Kota Medan</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Legenda jenjang */}
          {Object.entries(COLORS).map(([j, c]) => (
            <span key={j} style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }}></span>{j}
            </span>
          ))}
          {/* Legenda vektor */}
          <span style={{ fontSize: 10, color: '#64748b', borderLeft: '1px solid #e2e8f0', paddingLeft: 8,
            display: 'flex', gap: 10, alignItems: 'center' }}>
            <span>● Point</span>
            <span style={{ color: '#2563eb' }}>— Line</span>
            <span style={{ color: 'rgba(37,99,235,0.4)' }}>◉ Polygon</span>
          </span>
        </div>
      </div>

      <div className="main">
        {/* ── Sidebar ── */}
        <div className="sidebar">
          <div className="sidebar-inner">

            {/* Tombol lokasi */}
            <button className="btn-lokasi" onClick={getMyLocation} disabled={gpsLoad}>
              {gpsLoad ? '⏳ Mengambil lokasi...' : '📍 Lokasi Saya'}
            </button>

            {userPos && (
              <div className="filter-section">
                <div className="radius-row">
                  <label>Radius pencarian (Polygon)</label>
                  <span className="radius-val">{radius} km</span>
                </div>
                <input type="range" min="1" max="20" value={radius}
                  onChange={e => { setRadius(+e.target.value); clearRoute() }} />
              </div>
            )}

            {/* Info rute aktif di sidebar */}
            {routeInfo && activeSchool && (
              <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 10,
                padding: '10px 12px', marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#2563eb', marginBottom: 4 }}>
                  🗺️ RUTE AKTIF (Line Vector)
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', marginBottom: 6, lineHeight: 1.3 }}>
                  {activeSchool.nama_sekolah}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, textAlign: 'center', background: '#fff', borderRadius: 6, padding: '5px 0' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#2563eb' }}>{routeInfo.distanceKm} km</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>jarak jalan</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: '#fff', borderRadius: 6, padding: '5px 0' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#7c3aed' }}>~{routeInfo.durationMin} mnt</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>berkendara</div>
                  </div>
                </div>
                <button onClick={clearRoute} style={{ marginTop: 8, width: '100%', fontSize: 11,
                  background: 'none', border: '1px solid #bfdbfe', borderRadius: 6,
                  color: '#64748b', padding: '4px 0', cursor: 'pointer' }}>
                  Hapus rute
                </button>
              </div>
            )}

            <div className="divider" />

            {/* Filter */}
            <div className="filter-section">
              <label>Jenjang</label>
              <select value={filters.jenjang} onChange={e => setF('jenjang', e.target.value)}>
                <option value="">Semua Jenjang</option>
                {['SD', 'SMP', 'SMA', 'SMK'].map(j => <option key={j}>{j}</option>)}
              </select>
            </div>
            <div className="filter-section">
              <label>Status</label>
              <select value={filters.status} onChange={e => setF('status', e.target.value)}>
                <option value="">Semua Status</option>
                <option>Negeri</option><option>Swasta</option>
              </select>
            </div>
            <div className="filter-section">
              <label>Akreditasi</label>
              <select value={filters.akreditasi} onChange={e => setF('akreditasi', e.target.value)}>
                <option value="">Semua Akreditasi</option>
                {['A', 'B', 'C', 'Belum'].map(a => <option key={a}>{a}</option>)}
              </select>
            </div>

            <div className="divider" />

            <div className="results-label">
              {userPos
                ? `${displayed.length} sekolah dalam ${radius} km`
                : `${displayed.length} sekolah ditemukan`}
            </div>

            {displayed.length === 0 && <div className="empty-state">Tidak ada sekolah ditemukan</div>}

            {displayed.map(s => (
              <div key={s.id}
                className={`school-card ${activeId === s.id ? 'active' : ''}`}
                onClick={() => handleSchoolClick(s)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="sc-name" style={{ flex: 1 }}>{s.nama_sekolah}</div>
                  <span className={`badge badge-${s.jenjang}`}>{s.jenjang}</span>
                </div>
                <div className="sc-meta">
                  <span>{s.status || '-'}</span>
                  {s.akreditasi && <span className={`badge badge-${s.akreditasi}`}>Akred. {s.akreditasi}</span>}
                  <span>{s.kecamatan || '-'}</span>
                </div>
                {s.jarak !== null && (
                  <div className="sc-dist">
                    📏 {s.jarak} km
                    {activeId === s.id && routeInfo &&
                      <span style={{ color: '#7c3aed' }}> · 🗺️ {routeInfo.distanceKm} km via jalan</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Map ── */}
        <div className="map-wrap" style={{ position: 'relative' }}>

          {/* Panel info rute di atas peta */}
          {routeInfo && activeSchool && (
            <RoutePanel routeInfo={routeInfo} schoolName={activeSchool.nama_sekolah} onClose={clearRoute} />
          )}

          <MapContainer center={[3.5952, 98.6722]} zoom={12}
            style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {flyTo && <FlyTo coords={flyTo} />}
            {routeCoords && userPos && <FitRoute routeCoords={routeCoords} userPos={userPos} />}

            {/* ── POLYGON: Lingkaran radius dari lokasi user ── */}
            {userPos && (
              <>
                <Marker position={userPos} icon={userIcon}>
                  <Popup><strong>📍 Lokasi Anda</strong></Popup>
                </Marker>
                <Circle
                  center={userPos}
                  radius={radius * 1000}
                  pathOptions={{
                    color: '#2563eb', fillColor: '#2563eb',
                    fillOpacity: 0.06, weight: 1.5, dashArray: '6 4'
                  }}
                />
              </>
            )}

            {/* ── LINE: Polyline rute dari user ke sekolah ── */}
            {routeCoords && (
              <>
                {/* Shadow/glow effect */}
                <Polyline
                  positions={routeCoords}
                  pathOptions={{ color: '#93c5fd', weight: 8, opacity: 0.4 }}
                />
                {/* Garis utama rute */}
                <Polyline
                  positions={routeCoords}
                  pathOptions={{
                    color: '#2563eb', weight: 4, opacity: 0.9,
                    dashArray: '10 5', lineCap: 'round', lineJoin: 'round'
                  }}
                />
              </>
            )}

            {/* ── POINT: Marker setiap sekolah ── */}
            {displayed.map(s => (
              <Marker
                key={s.id}
                position={[s.lat, s.lng]}
                icon={makeIcon(s.jenjang, activeId === s.id)}
                eventHandlers={{ click: () => handleSchoolClick(s) }}
              >
                <Popup minWidth={230} maxWidth={280}>
                  <SchoolPopup
                    s={s}
                    userPos={userPos}
                    routeInfo={activeId === s.id ? routeInfo : null}
                    routeLoading={activeId === s.id ? routeLoading : false}
                  />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}