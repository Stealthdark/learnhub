import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you're looking for doesn't exist or has been moved. Browse LearnHub's free developer courses and roadmaps."
        path="/404"
        noindex
      />
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: 16,
      background: 'var(--bg)',
      textAlign: 'center',
      padding: '0 24px',
    }}>
      <div style={{ fontSize: 72, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>404</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)' }}>Page not found</div>
      <div style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 360 }}>
        The page you're looking for doesn't exist or has been moved.
      </div>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 8 }}>
        Back to home
      </Link>
    </div>
    </>
  )
}
