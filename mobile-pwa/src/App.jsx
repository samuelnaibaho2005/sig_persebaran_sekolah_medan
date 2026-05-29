import { useState, useEffect } from 'react'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FormPage     from './pages/FormPage'

export default function App() {
  // 'login' | 'register' | 'app'
  const [page, setPage] = useState(
    localStorage.getItem('token') ? 'app' : 'login'
  )
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const handleLogin = (t) => {
    localStorage.setItem('token', t)
    setToken(t)
    setPage('app')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    setPage('login')
  }

  if (page === 'register') {
    return (
      <RegisterPage
        onGoLogin={() => setPage('login')}
      />
    )
  }

  if (page === 'login' || !token) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoRegister={() => setPage('register')}
      />
    )
  }

  return <FormPage token={token} onLogout={handleLogout} />
}