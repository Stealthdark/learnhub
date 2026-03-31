import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SEO from '../components/SEO'
import { Icon } from '../components/shared/Icon'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { apiLogin, loginUser } from '../utils/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const next = new URLSearchParams(location.search).get('next') || '/dashboard'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await apiLogin(email, password)
      loginUser(token)
      login(user)
      showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success')
      navigate(next, { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <>
      <SEO
        title="Log In"
        description="Log in to your LearnHub account to access your courses, track progress, and continue your structured learning journey."
        path="/login"
        noindex
      />

      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 20 }}>
        <div className="card" style={{ width: '100%', maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8, textDecoration: 'none' }}>
              <img src="/assets/og/logo/learnhub-logo.png" alt="LearnHub" style={{ width: 34, height: 34, borderRadius: 8 }} />
              <span style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>LearnHub.Dev</span>
            </Link>
            <p style={{ color: 'var(--text2)', fontSize: 13 }}>Professional E-Learning Platform</p>
          </div>

          <div style={{ padding: '24px 24px 28px' }}>
            <h1 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 20, fontWeight: 500, marginBottom: 20, textAlign: 'center' }}>Sign In</h1>

            {error && (
              <div style={{ background: 'var(--red-bg)', border: '1px solid #f5c6c5', borderRadius: 4, padding: '10px 14px', fontSize: 13, color: 'var(--red)', marginBottom: 16 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="login-email">Email Address</label>
                <input id="login-email" className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="login-password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input id="login-password" className="input" type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ paddingRight: 40 }} autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}>
                    {showPass ? <Icon.EyeOff /> : <Icon.Eye />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                {loading ? <span className="spinner" /> : 'Sign In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text2)' }}>
              Don't have an account?{' '}
              <Link to="/sign-up" style={{ color: 'var(--primary)', fontWeight: 500 }}>Create one free →</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
