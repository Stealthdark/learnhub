import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()
  const location = useLocation()

  function isActive(path) {
    return location.pathname === path ? 'mkt-nav__link active' : 'mkt-nav__link'
  }

  return (
    <nav className="mkt-nav" role="navigation" aria-label="Main navigation">
      <div className="mkt-nav__inner">
        <Link to="/" className="mkt-nav__logo" aria-label="LearnHub home">
          <img src="/assets/og/logo/learnhub-logo.png" alt="LearnHub logo" width="36" height="36" />
          <span>LearnHub</span>
        </Link>

        <div className="mkt-nav__links" role="list">
          <Link to="/courses" className={isActive('/courses')}>Courses</Link>
          <Link to="/roadmaps" className={isActive('/roadmaps')}>Roadmaps</Link>
          <Link to="/pricing" className={isActive('/pricing')}>Pricing</Link>
          <Link to="/about" className={isActive('/about')}>About</Link>
          <Link to="/blog" className={isActive('/blog')}>Blog</Link>
        </div>

        <div className="mkt-nav__ctas">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Log In</Link>
              <Link to="/sign-up" className="btn btn-primary btn-sm">Get Started Free</Link>
            </>
          )}
          <button
            className="mkt-nav__hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mkt-nav__mobile${menuOpen ? ' show' : ''}`} role="menu">
        <Link to="/courses" className="mkt-nav__link" role="menuitem" onClick={() => setMenuOpen(false)}>Courses</Link>
        <Link to="/roadmaps" className="mkt-nav__link" role="menuitem" onClick={() => setMenuOpen(false)}>Roadmaps</Link>
        <Link to="/pricing" className="mkt-nav__link" role="menuitem" onClick={() => setMenuOpen(false)}>Pricing</Link>
        <Link to="/about" className="mkt-nav__link" role="menuitem" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/blog" className="mkt-nav__link" role="menuitem" onClick={() => setMenuOpen(false)}>Blog</Link>
        <div className="mkt-nav__mobile-divider" />
        {user ? (
          <Link to="/dashboard" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Log In</Link>
            <Link to="/sign-up" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Get Started Free</Link>
          </>
        )}
      </div>
    </nav>
  )
}
