import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import FormPage  from './pages/FormPage'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const handleLogin  = (t) => { localStorage.setItem('token', t); setToken(t) }
  const handleLogout = ()  => { localStorage.removeItem('token'); setToken('') }

  if (!token) return <LoginPage onLogin={handleLogin} />
  return <FormPage token={token} onLogout={handleLogout} />
}