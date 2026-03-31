import { Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'

const courses = [
  {
    id: 'nodejs-30day',
    emoji: '⚡',
    color: '#7c4dff',
    softColor: '#ede7f6',
    title: '30-Day Node.js Mastery Plan',
    subtitle: 'Frontend → Fullstack · Backend Blueprint',
    description: 'Build production-ready backend applications from scratch. Master Express, middleware, databases, authentication, and deployment in 30 structured days.',
    level: 'Intermediate',
    category: 'Backend Development',
    duration: '30 Days',
    dailyEffort: '2–3 Hours',
    prerequisites: 'JavaScript ES6+',
    outcome: 'REST API + Portfolio Project',
  },
  {
    id: 'frontend-roadmap',
    emoji: '🎨',
    color: '#1a73e8',
    softColor: '#e8f0fe',
    title: 'Frontend Development Roadmap',
    subtitle: 'HTML · CSS · JavaScript · DOM Mastery',
    description: 'Go from zero to building interactive websites with HTML, CSS, and JavaScript. A complete 60-day roadmap covering semantic HTML, responsive CSS, and modern JavaScript.',
    level: 'Beginner',
    category: 'Frontend Development',
    duration: '60 Days',
    dailyEffort: '2 Hours',
    prerequisites: 'None',
    outcome: 'Responsive Portfolio Website',
  },
  {
    id: 'sql-mongodb-20day',
    emoji: '🗄️',
    color: '#007b83',
    softColor: '#e0f5f5',
    title: 'SQL & MongoDB 20-Day Plan',
    subtitle: 'Relational + NoSQL · Databases for Developers',
    description: 'Master both relational (SQL) and document (MongoDB) databases in 20 days. Learn queries, schema design, indexing, and integration with Node.js applications.',
    level: 'Beginner',
    category: 'Database Engineering',
    duration: '20 Days',
    dailyEffort: '2 Hours',
    prerequisites: 'Basic programming',
    outcome: 'Full-stack data layer',
  },
  {
    id: 'ai-first-webdev-49day',
    emoji: '🤖',
    color: '#e37400',
    softColor: '#fef7e0',
    title: 'AI-First Web Dev — 49 Days',
    subtitle: 'React · Next.js · Nuxt · AI · Playwright',
    description: 'Build production AI-powered web applications. Cover React, Next.js, Nuxt, AI API integration, and end-to-end testing with Playwright across 5 structured phases.',
    level: 'Advanced',
    category: 'Full-Stack + AI',
    duration: '49 Days',
    dailyEffort: '2–3 Hours',
    prerequisites: 'HTML/CSS/JavaScript',
    outcome: 'Production AI Web App',
  },
  {
    id: 'smart-ba-roadmap',
    emoji: '📊',
    color: '#137333',
    softColor: '#e6f4ea',
    title: 'Smart Business Analyst Roadmap',
    subtitle: 'Requirements · Analysis · Stakeholder Management',
    description: 'Transition into business analysis with a structured roadmap covering requirements engineering, process modeling, agile methodologies, and career preparation.',
    level: 'Beginner',
    category: 'Business Analysis',
    duration: 'Self-Paced',
    dailyEffort: '1–2 Hours',
    prerequisites: 'None',
    outcome: 'BA Role Readiness',
  },
]

const COURSES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'LearnHub Developer Courses',
  url: 'https://learnhubdev.com/courses',
  numberOfItems: courses.length,
  itemListElement: courses.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      name: c.title,
      description: c.description,
      provider: { '@type': 'Organization', name: 'LearnHub', url: 'https://learnhubdev.com' },
      isAccessibleForFree: true,
      educationalLevel: c.level,
      about: c.category,
      url: `https://learnhubdev.com/course/${c.id}`,
    },
  })),
}

export default function CoursesPublicPage() {
  return (
    <>
      <SEO
        title="All Courses — Free Developer Roadmaps"
        description="Browse 5 free structured developer courses: Node.js (30 days), Frontend (60 days), SQL & MongoDB (20 days), AI-First Web Dev (49 days), and Business Analysis. Free, self-paced."
        path="/courses"
        keywords="free coding courses, nodejs course, frontend course, sql course, mongodb course, ai web development course, business analyst course, free developer courses 2025"
        breadcrumb={[{ name: 'Courses', path: '/courses' }]}
        jsonLd={COURSES_SCHEMA}
      />

      <Navbar />

      <main>
        <section className="mkt-page-hero">
          <div className="container">
            <h1>All Courses</h1>
            <p className="mkt-page-hero__sub">
              5 structured roadmaps. 200+ lessons. 100% free.
            </p>
          </div>
        </section>

        <section className="mkt-courses-catalog" aria-labelledby="catalog-heading">
          <div className="container">
            <h2 id="catalog-heading" className="sr-only">Course Catalog</h2>
            <div className="mkt-courses-catalog__grid">
              {courses.map(c => (
                <article key={c.id} className="mkt-catalog-card" style={{ borderTop: `4px solid ${c.color}` }}>
                  <div style={{ padding: '20px 24px 0' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>{c.emoji}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                      <span className="chip chip-blue" style={{ fontSize: 11 }}>{c.level}</span>
                      <span style={{ background: 'var(--bg)', color: 'var(--text2)', padding: '2px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, border: '1px solid var(--border)' }}>{c.category}</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Google Sans',sans-serif", marginBottom: 6, lineHeight: 1.3 }}>{c.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 12 }}>{c.subtitle}</p>
                    <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 16 }}>{c.description}</p>
                  </div>
                  <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                    {[['Duration', c.duration], ['Daily', c.dailyEffort], ['Prereqs', c.prerequisites], ['Outcome', c.outcome]].map(([k, v]) => (
                      <div key={k} style={{ background: 'var(--bg)', borderRadius: 6, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{k}</div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', marginTop: 1 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '0 24px 24px', display: 'flex', gap: 10 }}>
                    <Link to={`/course/${c.id}`} className="btn btn-primary btn-full">View Roadmap →</Link>
                    <Link to="/sign-up" className="btn btn-ghost btn-sm">Enroll Free</Link>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ textAlign: 'center', padding: '48px 0 0' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🔜</div>
              <h3 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>More Courses Coming Soon</h3>
              <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 20 }}>React, TypeScript, DevOps, and more roadmaps are in the pipeline.</p>
              <Link to="/sign-up" className="btn btn-primary">Get Notified</Link>
            </div>
          </div>
        </section>

        <section className="mkt-cta" aria-label="Start for free">
          <div className="container">
            <div className="mkt-cta__inner">
              <h2>Enroll in any course — free</h2>
              <p>No credit card. No trial. All 5 courses free forever.</p>
              <div className="mkt-cta__btns">
                <Link to="/sign-up" className="btn btn-dark btn-lg">Create Free Account</Link>
                <Link to="/roadmaps" className="btn btn-outline-white btn-lg">View Roadmaps</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
