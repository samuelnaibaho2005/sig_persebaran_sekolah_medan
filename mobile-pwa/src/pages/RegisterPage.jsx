import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001/api'

export default function RegisterPage({ onGoLogin }) {
  const [form, setForm]       = useState({ username: '', password: '', confirmPassword: '' })
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validasi password cocok
    if (form.password !== form.confirmPassword) {
      return setError('Password dan konfirmasi password tidak cocok.')
    }

    // Validasi panjang password
    if (form.password.length < 6) {
      return setError('Password minimal 6 karakter.')
    }

    setLoading(true)
    try {
      const res = await axios.post(`${API}/auth/register`, {
        username: form.username,
        password: form.password,
      })
      setSuccess(`Akun "${res.data.data.username}" berhasil didaftarkan! Silakan login.`)
      setForm({ username: '', password: '', confirmPassword: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🏫</div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gray-800)' }}>
            GIS Sekolah Medan
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--gray-400)', marginTop: '4px' }}>
            Daftar akun admin baru
          </p>
        </div>

        <div className="card">

          {/* Alert Error */}
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {/* Alert Sukses */}
          {success && (
            <div className="alert alert-success" style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px',
            }}>
              ✅ {success}
            </div>
          )}

          <form onSubmit={handle}>
            {/* Username */}
            <div className="field">
              <label>Username</label>
              <input
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="Masukkan username"
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 6 karakter"
                autoComplete="new-password"
                required
              />
            </div>

            {/* Konfirmasi Password */}
            <div className="field">
              <label>Konfirmasi Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Ulangi password"
                autoComplete="new-password"
                required
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              style={{ marginTop: '4px' }}
            >
              {loading ? 'Mendaftarkan...' : 'Daftar Akun'}
            </button>
          </form>

          {/* Link ke Login */}
          <p style={{
            textAlign: 'center',
            marginTop: '16px',
            fontSize: '13px',
            color: 'var(--gray-400)',
          }}>
            Sudah punya akun?{' '}
            <button
              onClick={onGoLogin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary, #2563eb)',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '13px',
                padding: 0,
              }}
            >
              Login di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}