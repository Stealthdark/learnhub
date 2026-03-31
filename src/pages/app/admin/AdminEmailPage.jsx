export default function AdminEmailPage() {
  return (
    <div className="page-pad" style={{ maxWidth: 700 }}>
      <h1 className="h1" style={{ marginBottom: 4 }}>Email Settings</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 24, fontSize: 14 }}>
        Verification emails are sent server-side via SMTP.
      </p>

      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
          <span style={{ fontSize: 32, lineHeight: 1 }}>✅</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Server-side email is active</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
              OTP emails are sent automatically via Nodemailer when users sign up.
              No client-side configuration is required.
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: 20 }} />

        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text2)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
          SMTP environment variables (set in Render dashboard)
        </div>
        {[
          ['SMTP_HOST', 'e.g. smtp.resend.com'],
          ['SMTP_PORT', 'e.g. 465'],
          ['SMTP_USER', 'e.g. resend'],
          ['SMTP_PASS', 'Your SMTP password / API key'],
          ['SMTP_FROM', 'e.g. noreply@learnhubdev.com'],
        ].map(([k, hint]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            <code style={{ fontFamily: "'Roboto Mono',monospace", fontSize: 12, background: 'var(--bg)', padding: '2px 6px', borderRadius: 3, color: 'var(--primary)' }}>{k}</code>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>{hint}</span>
          </div>
        ))}

        <div style={{ marginTop: 20, background: 'var(--primary-light)', border: '1px solid #aecbfa', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: 'var(--primary)', lineHeight: 1.6 }}>
          To update these values: Render dashboard → your service → <strong>Environment</strong> → Edit variables → Redeploy.
        </div>
      </div>
    </div>
  )
}
