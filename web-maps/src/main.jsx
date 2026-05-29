import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'

function Root() {
  const [page, setPage] = useState('landing') // 'landing' | 'map'

  return page === 'landing'
    ? <LandingPage onOpenMap={() => setPage('map')} />
    : <App onBack={() => setPage('landing')} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
