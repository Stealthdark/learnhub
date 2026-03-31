import { useState } from 'react'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact LearnHub',
  url: 'https://learnhubdev.com/contact',
  description: 'Get in touch with the LearnHub team',
  mainEntity: {
    '@type': 'Organization',
    name: 'LearnHub',
    url: 'https://learnhubdev.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
  },
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/learnhub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the LearnHub team. Questions about courses, feedback, bug reports, partnerships — we read every message."
        path="/contact"
        keywords="contact learnhub, learnhub support, feedback, help"
        breadcrumb={[{ name: 'Contact', path: '/contact' }]}
        jsonLd={CONTACT_SCHEMA}
      />

      <Navbar />

      <main>
        <section className="mkt-page-hero">
          <div className="container">
            <h1>Get in Touch</h1>
            <p className="mkt-page-hero__sub">
              We read every message. Usually reply within 24 hours.
            </p>
          </div>
        </section>

        <section style={{ padding: '60px 0 80px' }}>
          <div className="container">
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h2 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Message sent!</h2>
                  <p style={{ color: 'var(--text2)', fontSize: 15 }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="label" htmlFor="contact-name">Your Name</label>
                      <input id="contact-name" className="input" type="text" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="label" htmlFor="contact-email">Email Address</label>
                      <input id="contact-email" className="input" type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="label" htmlFor="contact-subject">Subject</label>
                    <select id="contact-subject" className="input" value={form.subject} onChange={e => set('subject', e.target.value)}>
                      <option value="general">General question</option>
                      <option value="course">Course feedback or issue</option>
                      <option value="bug">Bug report</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="label" htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" className="input" rows={6} required value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us what's on your mind..." style={{ resize: 'vertical' }} />
                  </div>

                  {status === 'error' && (
                    <p className="error-text" style={{ marginBottom: 12 }}>Something went wrong. Please try again or email us directly.</p>
                  )}

                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'} style={{ minWidth: 180 }}>
                    {status === 'sending' ? <span className="spinner" /> : 'Send Message'}
                  </button>
                </form>
              )}

              {/* Info cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 48 }}>
                {[
                  { icon: '💬', title: 'General Support', desc: 'Questions about courses, accounts, or the platform.' },
                  { icon: '🐛', title: 'Bug Reports', desc: 'Something broken? We want to know ASAP.' },
                  { icon: '🤝', title: 'Partnerships', desc: 'Collaborate or integrate with LearnHub.' },
                ].map(c => (
                  <div key={c.title} style={{ background: 'var(--bg)', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
