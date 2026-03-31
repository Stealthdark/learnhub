import { Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'

export default function BlogPage() {
  return (
    <>
      <SEO
        title="Blog — Developer Learning Tips & Roadmaps"
        description="LearnHub blog: developer learning tips, roadmap guides, career advice, and how to master Node.js, Frontend, Databases, and AI development. Coming soon."
        path="/blog"
        keywords="developer blog, coding tips, learning roadmap blog, web development articles, programming career"
        breadcrumb={[{ name: 'Blog', path: '/blog' }]}
      />

      <Navbar />

      <main>
        <section className="mkt-page-hero">
          <div className="container">
            <h1>LearnHub Blog</h1>
            <p className="mkt-page-hero__sub">
              Developer tips, roadmap guides, and learning strategies.
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
              <div style={{ fontSize: 64, marginBottom: 24 }}>✍️</div>
              <h2 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
                Blog coming soon
              </h2>
              <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
                We're working on articles covering developer learning strategies, roadmap deep-dives, career advice, and technical tutorials. Sign up to be notified when we publish.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/sign-up" className="btn btn-primary btn-lg">Get Notified</Link>
                <Link to="/courses" className="btn btn-ghost btn-lg">Browse Courses</Link>
              </div>
            </div>

            {/* Upcoming topics */}
            <div style={{ marginTop: 64, maxWidth: 640, margin: '64px auto 0' }}>
              <h3 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24, color: 'var(--text2)' }}>
                Upcoming articles
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'How to learn Node.js in 30 days (without getting overwhelmed)',
                  'Frontend vs Backend: which should you learn first?',
                  'The honest guide to SQL for JavaScript developers',
                  'Building AI-powered apps with Next.js and OpenAI',
                  '5 signs your learning roadmap is actually working',
                  'From tutorial hell to real projects: a structured approach',
                ].map(title => (
                  <div key={title} style={{ background: 'var(--bg)', borderRadius: 8, padding: '14px 18px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18 }}>📝</span>
                    <span style={{ fontSize: 14, color: 'var(--text2)' }}>{title}</span>
                    <span className="chip chip-blue" style={{ fontSize: 10, marginLeft: 'auto', flexShrink: 0 }}>Soon</span>
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
