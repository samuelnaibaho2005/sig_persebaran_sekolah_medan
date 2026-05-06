import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001/api'

export default function LoginPage({ onLogin }) {
  const [form, setForm]   = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(`${API}/auth/login`, form)
      onLogin(res.data.token)
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ width:'100%', maxWidth:'380px' }}>
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontSize:'36px', marginBottom:'8px' }}>🏫</div>
          <h1 style={{ fontSize:'20px', fontWeight:700, color:'var(--gray-800)' }}>GIS Sekolah Medan</h1>
          <p style={{ fontSize:'13px', color:'var(--gray-400)', marginTop:'4px' }}>Login untuk input data sekolah</p>
        </div>
        <div className="card">
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handle}>
            <div className="field">
              <label>Username</label>
              <input value={form.username} onChange={e => setForm({...form, username:e.target.value})} placeholder="admin" required />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} placeholder="••••••••" required />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop:'4px' }}>
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}