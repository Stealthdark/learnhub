import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Toast from '../shared/Toast'
import AvatarEl from '../shared/AvatarEl'
import { Icon } from '../shared/Icon'
import { useAuth } from '../../hooks/useAuth'

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isAdmin = user?.role === 'admin'

  const bottomItems = [
    { to: '/dashboard', label: 'Home', icon: <Icon.Home /> },
    { to: '/my-courses', label: 'Courses', icon: <Icon.Book /> },
    { to: '/profile', label: 'Profile', icon: <Icon.Settings /> },
    ...(isAdmin ? [
      { to: '/admin/users', label: 'Users', icon: <Icon.Users /> },
      { to: '/admin/courses', label: 'Admin', icon: <Icon.Admin /> },
    ] : []),
  ].slice(0, 5)

  function isBottomActive(path) {
    if (path === '/my-courses') return location.pathname === '/my-courses' || location.pathname.startsWith('/course/')
    return location.pathname === path
  }

  return (
    <>
      <div className="app-layout">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Mobile top bar */}
          <div className="mobile-topbar">
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--text2)', display: 'flex', alignItems: 'center' }}
              aria-label="Open menu"
            >
              <Icon.Menu />
            </button>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 28, height: 28, background: 'var(--primary)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700 }}>L</div>
              <span style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>LearnHub</span>
            </Link>
            <AvatarEl user={user} size={30} />
          </div>
          <main className="app-main">{children}</main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav">
        {bottomItems.map(item => (
          <button
            key={item.to}
            className={isBottomActive(item.to) ? 'active' : ''}
            onClick={() => navigate(item.to)}
          >
            {item.icon}<span>{item.label}</span>
          </button>
        ))}
      </nav>

      <Toast />
    </>
  )
}
