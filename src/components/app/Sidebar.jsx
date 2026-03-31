import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../shared/Icon'
import AvatarEl from '../shared/AvatarEl'
import { useAuth } from '../../hooks/useAuth'

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isAdmin = user?.role === 'admin'

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <Icon.Home /> },
    { to: '/my-courses', label: 'My Courses', icon: <Icon.Book /> },
    { to: '/profile', label: 'Profile', icon: <Icon.Settings /> },
    ...(isAdmin ? [
      { to: '/admin/courses', label: 'Manage Courses', icon: <Icon.Upload /> },
      { to: '/admin/users', label: 'Users', icon: <Icon.Users /> },
      { to: '/admin/email', label: 'Email Settings', icon: <Icon.Mail /> },
    ] : []),
  ]

  function isActive(path) {
    return location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path))
  }

  return (
    <>
      <div className={`sidebar-overlay${open ? ' show' : ''}`} onClick={onClose} />
      <aside className={`sidebar${open ? ' open' : ''}`}>
        {/* Logo */}
        <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/assets/og/logo/learnhub-logo.png" alt="LearnHub Logo" style={{ width: 34, height: 34, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>LearnHub.Dev</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>{isAdmin ? 'Admin Panel' : 'Learning Platform'}</div>
            </div>
          </div>
          <button onClick={onClose} className="sidebar-close-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 4, display: 'flex' }}>
            <Icon.Close />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 10px 0', overflowY: 'auto' }}>
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link${isActive(item.to) ? ' active' : ''}`}
              onClick={onClose}
              style={{ textDecoration: 'none' }}
            >
              {item.icon}{item.label}
            </Link>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding: 14, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <AvatarEl user={user} size={34} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm btn-full" onClick={logout}>
            <Icon.Logout /> Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
