import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SEO from '../components/SEO'
import { Icon } from '../components/shared/Icon'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { apiSignup, apiVerifyEmail, apiResendOtp, loginUser } from '../utils/api'

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingVerify, setPendingVerify] = useState(null)
  const [verifyInput, setVerifyInput] = useState('')
  const [verifyError, setVerifyError] = useState('')

  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const next = new URLSearchParams(location.search).get('next') || '/onboarding'
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (form.password.length < 8) e.password = 'Min 8 characters'
    else if (!/[A-Z]/.test(form.password)) e.password = 'Must contain uppercase letter'
    else if (!/[0-9]/.test(form.password)) e.password = 'Must contain a number'
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match"
    return e
  }

  async function handleSignup(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await apiSignup(form.name.trim(), form.email, form.password)
      setPendingVerify({ email: form.email })
      showToast(`Verification code sent to ${form.email}`, 'success')
    } catch (err) {
      if (err.status === 409) setErrors({ email: 'Email already registered' })
      else setErrors({ global: err.message || 'Sign up failed. Please try again.' })
    }
    setLoading(false)
  }

  async function handleVerify(e) {
    e.preventDefault()
    setVerifyError('')
    if (!verifyInput || verifyInput.length !== 6) { setVerifyError('Enter the 6-digit code.'); return }
    setLoading(true)
    try {
      const { token, user } = await apiVerifyEmail(pendingVerify.email, verifyInput)
      loginUser(token)
      login(user)
      showToast('Account verified! Welcome to LearnHub 🎉', 'success')
      navigate(next, { replace: true })
    } catch (err) {
      setVerifyError(err.message || 'Invalid code. Try again.')
    }
    setLoading(false)
  }

  if (pendingVerify) {
    return (
      <>
        <SEO title="Verify Email" description="Verify your email to complete your LearnHub account setup." path="/sign-up" noindex />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 20 }}>
          <div className="card" style={{ width: '100%', maxWidth: 420, padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
            <h2 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 22, fontWeight: 500, marginBottom: 8 }}>Check your inbox</h2>
            <p style={{ color: 'var(--text2)', marginBottom: 24, fontSize: 14, lineHeight: 1.7 }}>
              We sent a 6-digit code to<br />
              <strong style={{ color: 'var(--text)' }}>{pendingVerify.email}</strong>
            </p>
            <form onSubmit={handleVerify}>
              <input
                className="input"
                placeholder="_ _ _ _ _ _"
                value={verifyInput}
                onChange={e => setVerifyInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                style={{ textAlign: 'center', fontSize: 28, letterSpacing: 8, fontFamily: "'Roboto Mono',monospace", marginBottom: 8 }}
                autoFocus
              />
              {verifyError && <p className="error-text" style={{ marginBottom: 8 }}>{verifyError}</p>}
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>
                {loading ? <span className="spinner" /> : 'Verify & Continue'}
              </button>
            </form>
            <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }} disabled={loading}
              onClick={async () => {
                try { await apiResendOtp(pendingVerify.email); showToast('New code sent!', 'info') }
                catch (err) { showToast(err.message || 'Could not resend code', 'error') }
              }}>
              Resend Code
            </button>
            <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => { setPendingVerify(null); setVerifyInput(''); setVerifyError('') }}>
              ← Back to Sign Up
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Create Free Account"
        description="Create a free LearnHub account and start learning with structured developer roadmaps. No credit card required. 5 courses, 200+ lessons — free forever."
        path="/sign-up"
        noindex
      />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 20 }}>
        <div className="card" style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8, textDecoration: 'none' }}>
              <img src="/assets/og/logo/learnhub-logo.png" alt="LearnHub" style={{ width: 34, height: 34, borderRadius: 8 }} />
              <span style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>LearnHub.Dev</span>
            </Link>
            <p style={{ color: 'var(--text2)', fontSize: 13 }}>Start learning with structured roadmaps</p>
          </div>

          <div style={{ padding: '24px 24px 28px' }}>
            <h1 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 20, fontWeight: 500, marginBottom: 20, textAlign: 'center' }}>Create Free Account</h1>

            {errors.global && (
              <div style={{ background: 'var(--red-bg)', border: '1px solid #f5c6c5', borderRadius: 4, padding: '10px 14px', fontSize: 13, color: 'var(--red)', marginBottom: 16 }}>
                {errors.global}
              </div>
            )}

            <form onSubmit={handleSignup} noValidate>
              <div className="form-group">
                <label className="label" htmlFor="signup-name">Full Name</label>
                <input id="signup-name" className={`input${errors.name ? ' error' : ''}`} type="text" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="signup-email">Email Address</label>
                <input id="signup-email" className={`input${errors.email ? ' error' : ''}`} type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" autoComplete="email" />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="signup-password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input id="signup-password" className={`input${errors.password ? ' error' : ''}`} type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 8 chars, 1 uppercase, 1 number" style={{ paddingRight: 40 }} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}>
                    {showPass ? <Icon.EyeOff /> : <Icon.Eye />}
                  </button>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="signup-confirm">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input id="signup-confirm" className={`input${errors.confirmPassword ? ' error' : ''}`} type={showConfirm ? 'text' : 'password'} required value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} placeholder="Repeat password" style={{ paddingRight: 40 }} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowConfirm(v => !v)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}>
                    {showConfirm ? <Icon.EyeOff /> : <Icon.Eye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                {loading ? <span className="spinner" /> : 'Create Account'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text2)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 500 }}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
