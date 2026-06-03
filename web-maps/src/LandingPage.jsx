import { useState, useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import bagasPhoto from './assets/contributors/bagas.jpeg'
import fajarPhoto from './assets/contributors/fajar.jpeg'
import riaPhoto from './assets/contributors/ria.jpeg'
import samuelPhoto from './assets/contributors/samuel.jpg'
import zakiyyaPhoto from './assets/contributors/dilla.jpeg'
import partogiPhoto from './assets/contributors/partogi.png'


const contributors = [
  { name: 'BAGAS INSYAFI WIRADINATA', nim: '2305181088', photo: bagasPhoto, role: 'Mobile Developer', accent: '#22c55e' },
  { name: 'FAJAR SIDDIK YUDHISTIRA', nim: '2305181068', photo: fajarPhoto, role: 'Data Collection & Database Designer', accent: '#3b82f6' },
  { name: 'RIA ADELINA', nim: '2305181072', photo: riaPhoto, role: 'Data Collection & Documentation', accent: '#ec4899' },
  { name: 'SAMUEL NIKOLAS NAIBAHO', nim: '2305181036', photo: samuelPhoto, role: 'Project Lead & Web Developer', accent: '#f59e0b' },
  { name: 'ZAKIYYA AIDILLA FITHRA', nim: '2305181028', photo: zakiyyaPhoto, role: 'System Analyst', accent: '#a78bfa' },
  { name: 'PARTOGI IMMANUELA SIHOMBING', nim: '2305181028', photo: partogiPhoto, role: 'Database Designer', accent: '#294a87' },
]

function ContributorsSection() {
  return (
    <div className="lp-spatial-wrap">
      <div className="lp-spatial-inner">
        <div className="lp-spatial-header">
          <div className="lp-spatial-tag">👥 Developer</div>
          <h2 className="lp-spatial-title">Mahasiswa Kontributor</h2>
          <p className="lp-spatial-sub">
            Tim mahasiswa yang berkontribusi dalam pengembangan proyek SIG Persebaran Sekolah Medan.
          </p>
        </div>

        <div className="lp-contributors-grid">
          {contributors.map((member) => (
            <article
              className="lp-contributor-card"
              key={member.nim}
              style={{ '--contrib-color': member.accent }}
            >
              <div className="lp-contributor-photo-wrap">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="lp-contributor-photo"
                />
              </div>
              <div className="lp-contributor-body">
                <div className="lp-contributor-name">{member.name}</div>
                <div className="lp-contributor-nim">NIM {member.nim}</div>
                <div className="lp-contributor-role">{member.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Badge & StatCard & FeatureCard ─────────────────────────── */
function Badge({ label, color, bg }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '3px 10px',
      borderRadius: 999, background: bg, color,
      border: `1px solid ${color}33`, letterSpacing: '0.04em'
    }}>{label}</span>
  )
}
function StatCard({ value, label, icon }) {
  return (
    <div className="lp-stat-card">
      <div className="lp-stat-icon">{icon}</div>
      <div className="lp-stat-value">{value}</div>
      <div className="lp-stat-label">{label}</div>
    </div>
  )
}
function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className="lp-feat-card" style={{ '--feat-color': color }}>
      <div className="lp-feat-icon">{icon}</div>
      <h3 className="lp-feat-title">{title}</h3>
      <p className="lp-feat-desc">{desc}</p>
    </div>
  )
}

/* ─── LandingPage utama ──────────────────────────────────────── */
export default function LandingPage({ onOpenMap }) {
  const [scrolled, setScrolled] = useState(false)
  const spatialRef = useRef(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --lp-bg:       #0a0f1e;
          --lp-surface:  #111827;
          --lp-surface2: #1a2235;
          --lp-border:   #1e2d45;
          --lp-text:     #e2e8f0;
          --lp-muted:    #64748b;
          --lp-green:    #22c55e;
          --lp-blue:     #3b82f6;
          --lp-pink:     #ec4899;
          --lp-amber:    #f59e0b;
          --lp-purple:   #a78bfa;
          --lp-font:     'Sora', sans-serif;
          --lp-mono:     'DM Mono', monospace;
        }

        .lp-root { font-family: var(--lp-font); background: var(--lp-bg); color: var(--lp-text); min-height: 100vh; overflow-x: hidden; }

        /* Navbar */
        .lp-nav { position:fixed; top:0; left:0; right:0; z-index:200; display:flex; align-items:center; justify-content:space-between; padding:16px 40px; transition:all .3s; }
        .lp-nav.scrolled { background:rgba(10,15,30,0.95); backdrop-filter:blur(12px); border-bottom:1px solid var(--lp-border); }
        .lp-nav-brand { font-size:15px; font-weight:700; color:var(--lp-green); display:flex; align-items:center; gap:8px; }
        .lp-nav-links { display:flex; gap:8px; }
        .lp-nav-btn { font-family:var(--lp-font); font-size:13px; font-weight:600; padding:8px 20px; border-radius:8px; cursor:pointer; transition:all .2s; border:none; }
        .lp-nav-btn.ghost { background:transparent; color:var(--lp-muted); border:1px solid var(--lp-border); }
        .lp-nav-btn.ghost:hover { color:var(--lp-text); border-color:var(--lp-blue); }
        .lp-nav-btn.primary { background:var(--lp-green); color:#0a0f1e; }
        .lp-nav-btn.primary:hover { background:#16a34a; transform:translateY(-1px); }

        /* Hero */
        .lp-hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:100px 24px 60px; position:relative; overflow:hidden; }
        .lp-hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(59,130,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.05) 1px,transparent 1px); background-size:60px 60px; mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%); }
        .lp-hero-glow { position:absolute; width:600px; height:600px; background:radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
        .lp-hero-tag { font-family:var(--lp-mono); font-size:11px; letter-spacing:.12em; color:var(--lp-green); background:rgba(34,197,94,0.08); border:1px solid rgba(34,197,94,0.2); padding:5px 14px; border-radius:999px; margin-bottom:24px; display:inline-block; animation:fadeUp .6s ease both; }
        .lp-hero-title { font-size:clamp(2.5rem,6vw,4.5rem); font-weight:800; line-height:1.1; letter-spacing:-.03em; margin-bottom:20px; animation:fadeUp .6s .1s ease both; }
        .lp-hero-title .accent { color:var(--lp-green); }
        .lp-hero-sub { font-size:clamp(1rem,2vw,1.15rem); color:var(--lp-muted); line-height:1.7; max-width:560px; margin:0 auto 40px; animation:fadeUp .6s .2s ease both; }
        .lp-hero-actions { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; animation:fadeUp .6s .3s ease both; }
        .lp-hero-btn { font-family:var(--lp-font); font-size:15px; font-weight:700; padding:14px 32px; border-radius:10px; cursor:pointer; transition:all .25s; border:none; }
        .lp-hero-btn.main { background:var(--lp-green); color:#0a0f1e; box-shadow:0 0 30px rgba(34,197,94,0.25); }
        .lp-hero-btn.main:hover { background:#16a34a; transform:translateY(-2px); box-shadow:0 0 40px rgba(34,197,94,0.35); }
        .lp-hero-btn.secondary { background:transparent; color:var(--lp-text); border:1.5px solid var(--lp-border); }
        .lp-hero-btn.secondary:hover { border-color:var(--lp-blue); color:var(--lp-blue); transform:translateY(-2px); }
        .lp-hero-badges { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-top:48px; animation:fadeUp .6s .4s ease both; }

        /* Stats */
        .lp-stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:16px; padding:60px 40px; max-width:900px; margin:0 auto; }
        .lp-stat-card { background:var(--lp-surface); border:1px solid var(--lp-border); border-radius:16px; padding:24px 20px; text-align:center; transition:all .25s; }
        .lp-stat-card:hover { border-color:var(--lp-green); transform:translateY(-4px); box-shadow:0 8px 32px rgba(34,197,94,0.1); }
        .lp-stat-icon { font-size:28px; margin-bottom:12px; }
        .lp-stat-value { font-size:2rem; font-weight:800; color:var(--lp-green); line-height:1; }
        .lp-stat-label { font-size:12px; color:var(--lp-muted); margin-top:6px; }

        /* Features */
        .lp-features { padding:80px 40px; max-width:1100px; margin:0 auto; }
        .lp-section-tag { font-family:var(--lp-mono); font-size:11px; letter-spacing:.1em; color:var(--lp-blue); background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.2); padding:4px 12px; border-radius:999px; display:inline-block; margin-bottom:16px; }
        .lp-section-title { font-size:clamp(1.8rem,4vw,2.8rem); font-weight:800; letter-spacing:-.03em; margin-bottom:12px; line-height:1.2; }
        .lp-section-sub { color:var(--lp-muted); font-size:1rem; line-height:1.6; max-width:500px; margin-bottom:48px; }
        .lp-feat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; }
        .lp-feat-card { background:var(--lp-surface); border:1px solid var(--lp-border); border-radius:16px; padding:28px 24px; transition:all .25s; position:relative; overflow:hidden; }
        .lp-feat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--feat-color,var(--lp-green)); opacity:0; transition:opacity .25s; }
        .lp-feat-card:hover { border-color:var(--feat-color,var(--lp-green)); transform:translateY(-4px); }
        .lp-feat-card:hover::before { opacity:1; }
        .lp-feat-icon { font-size:32px; margin-bottom:16px; }
        .lp-feat-title { font-size:16px; font-weight:700; margin-bottom:8px; }
        .lp-feat-desc { font-size:13.5px; color:var(--lp-muted); line-height:1.6; }

        /* Spatial section */
        .lp-spatial-section { padding:80px 24px; background:var(--lp-surface); border-top:1px solid var(--lp-border); border-bottom:1px solid var(--lp-border); }
        .lp-spatial-wrap { max-width:900px; margin:0 auto; }
        .lp-spatial-inner { display:flex; flex-direction:column; gap:24px; }
        .lp-spatial-header { text-align:center; }
        .lp-spatial-tag { font-family:var(--lp-mono); font-size:11px; letter-spacing:.1em; color:var(--lp-purple); background:rgba(167,139,250,0.08); border:1px solid rgba(167,139,250,0.2); padding:4px 12px; border-radius:999px; display:inline-block; margin-bottom:16px; }
        .lp-spatial-title { font-size:clamp(1.8rem,4vw,2.5rem); font-weight:800; letter-spacing:-.03em; margin-bottom:12px; }
        .lp-spatial-sub { color:var(--lp-muted); font-size:14px; line-height:1.7; max-width:560px; margin:0 auto; }

        .lp-contributors-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
        .lp-contributor-card { background:var(--lp-bg); border:1.5px solid var(--lp-border); border-radius:18px; padding:22px 18px; display:flex; flex-direction:column; align-items:center; gap:14px; text-align:center; transition:all .25s; }
        .lp-contributor-card:hover { border-color:var(--contrib-color); transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.28); }
        .lp-contributor-photo-wrap { width:88px; height:88px; border-radius:50%; padding:3px; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg, var(--contrib-color), rgba(255,255,255,0.18)); }
        .lp-contributor-photo { width:100%; height:100%; border-radius:50%; object-fit:cover; border:3px solid var(--lp-bg); }
        .lp-contributor-body { display:flex; flex-direction:column; gap:6px; }
        .lp-contributor-name { font-size:14px; font-weight:700; color:var(--lp-text); line-height:1.3; }
        .lp-contributor-nim { font-family:var(--lp-mono); font-size:11px; color:var(--lp-muted); letter-spacing:0.06em; }
        .lp-contributor-role { font-size:11px; color:var(--lp-text); background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08); border-radius:999px; padding:4px 10px; display:inline-flex; align-self:center; }

        /* Mode toggle */
        .lp-mode-toggle { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; }
        .lp-mode-btn { font-family:var(--lp-font); font-size:13px; font-weight:600; padding:8px 20px; border-radius:8px; cursor:pointer; transition:all .2s; background:var(--lp-surface2); color:var(--lp-muted); border:1.5px solid var(--lp-border); }
        .lp-mode-btn.active { background:rgba(167,139,250,0.12); color:var(--lp-purple); border-color:rgba(167,139,250,0.4); }

        /* Points grid */
        .lp-points-grid { display:grid; grid-template-columns:1fr auto 1fr; gap:16px; align-items:start; }
        @media(max-width:640px){ .lp-points-grid{ grid-template-columns:1fr; } }
        .lp-point-box { background:var(--lp-bg); border:1.5px solid var(--lp-border); border-radius:14px; padding:20px; transition:border-color .2s; }
        .lp-point-box:focus-within { border-color:var(--point-color); }
        .lp-point-label { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:var(--lp-text); margin-bottom:14px; flex-wrap:wrap; }
        .lp-point-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
        .lp-point-name { font-size:10px; color:var(--lp-muted); font-weight:400; font-style:italic; flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0; max-width:140px; }
        .lp-coord-inputs { display:flex; flex-direction:column; gap:10px; }
        .lp-input-group { display:flex; flex-direction:column; gap:4px; }
        .lp-input-group label { font-size:11px; color:var(--lp-muted); font-weight:600; letter-spacing:.05em; }
        .lp-input { font-family:var(--lp-mono); font-size:13px; padding:9px 12px; background:var(--lp-surface); border:1.5px solid var(--lp-border); border-radius:8px; color:var(--lp-text); outline:none; transition:border-color .2s; width:100%; }
        .lp-input:focus { border-color:var(--input-focus,var(--lp-blue)); }
        .lp-input::placeholder { color:var(--lp-muted); opacity:.5; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }

        /* School picker */
        .lp-school-picker { display:flex; flex-direction:column; gap:8px; }
        .lp-search-input { font-family:var(--lp-font) !important; }
        .lp-school-list { max-height:220px; overflow-y:auto; display:flex; flex-direction:column; gap:4px; border:1px solid var(--lp-border); border-radius:10px; padding:6px; background:var(--lp-surface); }
        .lp-school-list::-webkit-scrollbar { width:4px; }
        .lp-school-list::-webkit-scrollbar-thumb { background:var(--lp-border); border-radius:2px; }
        .lp-school-loading { font-size:12px; color:var(--lp-muted); text-align:center; padding:16px 0; }
        .lp-school-item { font-family:var(--lp-font); font-size:12px; text-align:left; padding:7px 10px; border-radius:7px; background:transparent; border:1px solid transparent; color:var(--lp-muted); cursor:pointer; transition:all .15s; display:flex; align-items:center; gap:7px; }
        .lp-school-item:hover { background:rgba(255,255,255,0.04); color:var(--lp-text); border-color:var(--lp-border); }
        .lp-school-item.selected { background:color-mix(in srgb, var(--item-color) 12%, transparent); color:var(--lp-text); border-color:var(--item-color); }
        .lp-school-item-name { flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .lp-school-item-kec { font-size:10px; color:var(--lp-muted); white-space:nowrap; }
        .lp-school-badge { font-size:9px; font-weight:700; padding:1px 5px; border-radius:4px; flex-shrink:0; }
        .badge-SD  { background:#dcfce7; color:#166534; }
        .badge-SMP { background:#dbeafe; color:#1e40af; }
        .badge-SMA { background:#fce7f3; color:#9d174d; }
        .badge-SMK { background:#fef3c7; color:#92400e; }
        .lp-coord-preview { margin-top:10px; font-family:var(--lp-mono); font-size:11px; color:var(--lp-muted); background:var(--lp-surface2); border-radius:6px; padding:6px 10px; border:1px solid var(--lp-border); }

        /* Divider */
        .lp-points-divider { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding-top:48px; }
        .lp-divider-line { flex:1; width:1px; background:var(--lp-border); min-height:20px; }
        .lp-divider-icon { font-size:20px; }

        /* Error */
        .lp-error { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:10px 16px; font-size:13px; color:#fca5a5; }

        /* Actions */
        .lp-calc-actions { display:flex; gap:10px; }
        .lp-btn-calc { font-family:var(--lp-font); font-size:14px; font-weight:700; padding:13px 28px; border-radius:10px; background:var(--lp-purple); color:#fff; border:none; cursor:pointer; transition:all .2s; display:flex; align-items:center; gap:8px; flex:1; justify-content:center; }
        .lp-btn-calc:hover:not(:disabled) { background:#7c3aed; transform:translateY(-1px); }
        .lp-btn-calc:disabled { opacity:.6; cursor:not-allowed; }
        .lp-btn-reset { font-family:var(--lp-font); font-size:13px; font-weight:600; padding:13px 18px; border-radius:10px; background:transparent; color:var(--lp-muted); border:1.5px solid var(--lp-border); cursor:pointer; transition:all .2s; }
        .lp-btn-reset:hover { border-color:var(--lp-blue); color:var(--lp-blue); }
        .lp-spinner { display:inline-block; width:14px; height:14px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin .8s linear infinite; }

        /* Result */
        .lp-result-wrap { background:var(--lp-bg); border:1.5px solid rgba(167,139,250,0.3); border-radius:14px; overflow:hidden; }
        .lp-result-header { background:rgba(167,139,250,0.1); border-bottom:1px solid rgba(167,139,250,0.2); padding:12px 20px; font-size:13px; font-weight:700; color:var(--lp-purple); }
        .lp-result-cards { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--lp-border); }
        .lp-result-card { padding:24px 20px; text-align:center; background:var(--lp-surface); }
        .lp-rc-label { font-size:11px; color:var(--lp-muted); font-weight:600; margin-bottom:8px; }
        .lp-rc-value { font-size:2.2rem; font-weight:800; line-height:1; }
        .lp-rc-value.green { color:var(--lp-green); }
        .lp-rc-value.blue  { color:var(--lp-blue); }
        .lp-rc-value.amber { color:var(--lp-amber); }
        .lp-rc-value span { font-size:.9rem; color:var(--lp-muted); font-weight:400; }
        .lp-rc-sub { font-size:11px; color:var(--lp-muted); margin-top:6px; }
        .lp-result-detail { display:flex; flex-direction:column; }
        .lp-detail-row { display:flex; justify-content:space-between; align-items:center; padding:10px 20px; font-size:13px; border-top:1px solid var(--lp-border); gap:12px; }
        .lp-detail-label { color:var(--lp-muted); white-space:nowrap; }
        .lp-detail-val { font-family:var(--lp-mono); font-size:12px; color:var(--lp-text); text-align:right; }

        /* Mini Map */
        .lp-minimap-wrap { border-top:1px solid var(--lp-border); }
        .lp-minimap-label { display:flex; align-items:center; justify-content:space-between; padding:10px 16px; font-size:12px; font-weight:600; color:var(--lp-muted); background:var(--lp-surface2); flex-wrap:wrap; gap:8px; }
        .lp-minimap-badge { font-size:11px; padding:2px 10px; border-radius:999px; font-weight:600; }
        .lp-minimap-badge.osrm { background:rgba(59,130,246,0.12); color:var(--lp-blue); border:1px solid rgba(59,130,246,0.25); }
        .lp-minimap-badge.straight { background:rgba(100,116,139,0.12); color:var(--lp-muted); border:1px solid var(--lp-border); }
        .lp-minimap-legend { display:flex; gap:16px; padding:10px 16px; font-size:11px; color:var(--lp-muted); background:var(--lp-surface2); border-top:1px solid var(--lp-border); flex-wrap:wrap; }
        .lp-minimap-legend span { display:flex; align-items:center; gap:5px; }
        .leg-dot { width:8px; height:8px; border-radius:50%; display:inline-block; }
        .leg-line { display:inline-block; width:20px; height:2px; border-radius:1px; }
        .leg-line.dashed { background:repeating-linear-gradient(90deg,#94a3b8 0 4px,transparent 4px 8px); }
        .leg-line.solid { background:var(--lp-blue); }

        /* Formula */
        .lp-formula-wrap { border-top:1px solid var(--lp-border); padding-top:8px; }
        .lp-formula-toggle { font-family:var(--lp-font); font-size:12px; color:var(--lp-muted); background:none; border:none; cursor:pointer; padding:4px 0; transition:color .2s; }
        .lp-formula-toggle:hover { color:var(--lp-text); }
        .lp-formula-body { margin-top:12px; background:var(--lp-bg); border:1px solid var(--lp-border); border-radius:10px; padding:16px 20px; }
        .lp-formula-line { font-family:var(--lp-mono); font-size:13px; color:var(--lp-purple); line-height:1.9; }
        .lp-formula-note { font-size:12px; color:var(--lp-muted); line-height:1.6; margin-top:8px; }

        /* CTA */
        .lp-cta { padding:100px 24px; text-align:center; position:relative; overflow:hidden; }
        .lp-cta-glow { position:absolute; width:500px; height:500px; background:radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
        .lp-cta-title { font-size:clamp(2rem,4vw,3rem); font-weight:800; letter-spacing:-.03em; margin-bottom:16px; }
        .lp-cta-sub { color:var(--lp-muted); font-size:1rem; line-height:1.6; margin-bottom:36px; }

        /* Footer */
        .lp-footer { border-top:1px solid var(--lp-border); padding:24px 40px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .lp-footer-brand { font-size:13px; font-weight:600; color:var(--lp-green); }
        .lp-footer-copy { font-size:12px; color:var(--lp-muted); }
        .lp-footer-tech { font-family:var(--lp-mono); font-size:11px; color:var(--lp-muted); display:flex; gap:12px; }

        /* Animations */
        @keyframes fadeUp { from{ opacity:0; transform:translateY(20px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes spin   { to{ transform:rotate(360deg); } }

        /* Leaflet override (dark bg) */
        .leaflet-container { background:#1a2235 !important; font-family:var(--lp-font); }
        .leaflet-popup-content-wrapper { border-radius:10px !important; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:var(--lp-bg); }
        ::-webkit-scrollbar-thumb { background:var(--lp-border); border-radius:3px; }
      `}</style>

      <div className="lp-root">
        {/* Navbar */}
        <nav className={`lp-nav ${scrolled ? 'scrolled' : ''}`}>
          <div className="lp-nav-brand">🏫 SIG Sekolah Medan</div>
          <div className="lp-nav-links">
            <button className="lp-nav-btn ghost"
              onClick={() => spatialRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Kontributor
            </button>
            <button className="lp-nav-btn primary" onClick={onOpenMap}>Buka Peta →</button>
          </div>
        </nav>

        {/* Hero */}
        <section className="lp-hero">
          <div className="lp-hero-grid" />
          <div className="lp-hero-glow" />
          <div className="lp-hero-tag">📍 Kota Medan, Sumatera Utara</div>
          <h1 className="lp-hero-title">
            Sistem Informasi<br />
            <span className="accent">Persebaran Sekolah</span><br />
            Kota Medan
          </h1>
          <p className="lp-hero-sub">
            Visualisasi interaktif distribusi sekolah SD, SMP, SMA, dan SMK
            di seluruh kecamatan Kota Medan dengan analisis spasial berbasis GIS.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-hero-btn main" onClick={onOpenMap}>🗺 Buka Peta Interaktif</button>
            <button className="lp-hero-btn secondary"
              onClick={() => spatialRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              � Kontributor
            </button>
          </div>
          <div className="lp-hero-badges">
            <Badge label="SD"  color="#166534" bg="rgba(34,197,94,0.12)" />
            <Badge label="SMP" color="#1d4ed8" bg="rgba(59,130,246,0.12)" />
            <Badge label="SMA" color="#9d174d" bg="rgba(236,72,153,0.12)" />
            <Badge label="SMK" color="#92400e" bg="rgba(245,158,11,0.12)" />
          </div>
        </section>

        {/* Stats */}
        <section className="lp-stats">
          <StatCard value="99+" label="Sekolah Terdaftar" icon="🏫" />
          <StatCard value="21"  label="Kecamatan"         icon="🗺" />
          <StatCard value="4"   label="Jenjang Sekolah"   icon="📚" />
          <StatCard value="A–C" label="Tingkat Akreditasi" icon="🏆" />
        </section>

        <div style={{ height: 1, background: 'var(--lp-border)', maxWidth: 1100, margin: '0 auto' }} />

        {/* Features */}
        <section className="lp-features">
          <div className="lp-section-tag">✨ Fitur Unggulan</div>
          <h2 className="lp-section-title">Apa yang bisa kamu lakukan?</h2>
          <p className="lp-section-sub">Platform SIG lengkap untuk analisis distribusi dan aksesibilitas sekolah.</p>
          <div className="lp-feat-grid">
            <FeatureCard icon="📌" title="Point — Marker Sekolah"     color="var(--lp-green)"  desc="Lihat lokasi setiap sekolah sebagai titik di peta, lengkap dengan detail nama, status, akreditasi, fasilitas, dan ekskul." />
            <FeatureCard icon="📏" title="Line — Rute ke Sekolah"     color="var(--lp-blue)"   desc="Klik sekolah untuk melihat jalur rute berkendara via OSRM routing engine, lengkap dengan jarak dan estimasi waktu tempuh." />
            <FeatureCard icon="⭕" title="Polygon — Radius Pencarian"  color="var(--lp-purple)" desc="Aktifkan GPS untuk melihat radius pencarian berbentuk lingkaran. Sesuaikan radius 1–20 km untuk menemukan sekolah terdekat." />
            <FeatureCard icon="🔍" title="Filter Multi-Kriteria"       color="var(--lp-amber)"  desc="Filter sekolah berdasarkan jenjang, status (Negeri/Swasta), dan akreditasi (A/B/C) secara bersamaan." />
            <FeatureCard icon="📐" title="Analisis Spasial Jarak"     color="var(--lp-pink)"   desc="Hitung jarak Haversine dan rute jalan antara dua sekolah, lengkap dengan visualisasi peta mini interaktif." />
            <FeatureCard icon="📍" title="Lokasi Pengguna (GPS)"      color="var(--lp-green)"  desc="Deteksi posisi pengguna secara real-time dan tampilkan sekolah terdekat diurutkan berdasarkan jarak." />
          </div>
        </section>

        {/* Contributors */}
        <section className="lp-spatial-section" ref={spatialRef}>
          <ContributorsSection />
        </section>

        {/* CTA */}
        <section className="lp-cta">
          <div className="lp-cta-glow" />
          <h2 className="lp-cta-title">Siap Eksplorasi Peta?</h2>
          <p className="lp-cta-sub">
            Temukan distribusi sekolah, hitung jarak, dan analisis aksesibilitas
            pendidikan di Kota Medan secara interaktif.
          </p>
          <button className="lp-hero-btn main" onClick={onOpenMap}>🗺 Buka Peta Sekarang →</button>
        </section>

        {/* Footer */}
        <footer className="lp-footer">
          <div className="lp-footer-brand">🏫 SIG Persebaran Sekolah Medan</div>
          <div className="lp-footer-copy">© 2024 · Data dari OpenStreetMap</div>
          <div className="lp-footer-tech">
            <span>React</span><span>Leaflet</span><span>OSRM</span><span>OpenStreetMap</span>
          </div>
        </footer>
      </div>
    </>
  )
}
