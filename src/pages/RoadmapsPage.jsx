import { Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'

const roadmaps = [
  {
    id: 'nodejs-30day',
    emoji: '⚡',
    color: '#7c4dff',
    title: '30-Day Node.js Mastery Plan',
    subtitle: 'Frontend → Fullstack · Backend Blueprint',
    duration: '30 days',
    effort: '2–3 hrs/day',
    level: 'Intermediate',
    phases: ['Node.js Foundations', 'Express & APIs', 'Databases & Auth', 'Deploy & Scale'],
    outcome: 'Build & deploy a production REST API',
  },
  {
    id: 'frontend-roadmap',
    emoji: '🎨',
    color: '#1a73e8',
    title: 'Frontend Development Roadmap',
    subtitle: 'HTML · CSS · JavaScript · DOM',
    duration: '60 days',
    effort: '2 hrs/day',
    level: 'Beginner',
    phases: ['HTML & Semantic Structure', 'CSS & Responsive Design', 'JavaScript & DOM'],
    outcome: 'Build responsive websites with vanilla JavaScript',
  },
  {
    id: 'sql-mongodb-20day',
    emoji: '🗄️',
    color: '#007b83',
    title: 'SQL & MongoDB 20-Day Plan',
    subtitle: 'Relational + NoSQL · Databases for Devs',
    duration: '20 days',
    effort: '2 hrs/day',
    level: 'Beginner',
    phases: ['SQL Fundamentals', 'MongoDB & NoSQL'],
    outcome: 'Query any database confidently',
  },
  {
    id: 'ai-first-webdev-49day',
    emoji: '🤖',
    color: '#e37400',
    title: 'AI-First Web Dev — 49 Days',
    subtitle: 'React · Next.js · AI Integration · Testing',
    duration: '49 days',
    effort: '2–3 hrs/day',
    level: 'Advanced',
    phases: ['React Mastery', 'Next.js & SSR', 'Nuxt.js', 'AI Integration', 'Playwright Testing'],
    outcome: 'Build and ship production AI-powered web apps',
  },
  {
    id: 'smart-ba-roadmap',
    emoji: '📊',
    color: '#137333',
    title: 'Smart Business Analyst Roadmap',
    subtitle: 'Requirements · Analysis · Stakeholders',
    duration: 'Self-Paced',
    effort: '1–2 hrs/day',
    level: 'Beginner',
    phases: ['BA Fundamentals', 'Requirements Engineering', 'Process Modeling', 'Career & Certification'],
    outcome: 'Transition into a Business Analyst role',
  },
]

const ROADMAP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'LearnHub Developer Learning Roadmaps',
  description: 'Structured, day-by-day learning roadmaps for developers',
  numberOfItems: roadmaps.length,
  itemListElement: roadmaps.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      name: r.title,
      description: r.subtitle,
      provider: { '@type': 'Organization', name: 'LearnHub' },
      isAccessibleForFree: true,
      educationalLevel: r.level,
      url: `https://learnhubdev.com/course/${r.id}`,
    },
  })),
}

export default function RoadmapsPage() {
  return (
    <>
      <SEO
        title="Learning Roadmaps for Developers"
        description="5 structured learning roadmaps for developers: Node.js (30 days), Frontend (60 days), Databases (20 days), AI-First Web Dev (49 days), Business Analysis. Free, self-paced."
        path="/roadmaps"
        keywords="developer roadmap, nodejs roadmap, frontend roadmap, learning path, coding roadmap 2025, sql mongodb roadmap, ai development roadmap"
        breadcrumb={[{ name: 'Roadmaps', path: '/roadmaps' }]}
        jsonLd={ROADMAP_SCHEMA}
      />

      <Navbar />

      <main>
        <section className="mkt-page-hero">
          <div className="container">
            <h1>5 Developer Roadmaps. Zero Cost.</h1>
            <p className="mkt-page-hero__sub">
              Structured, day-by-day learning paths that turn beginners into builders.
            </p>
          </div>
        </section>

        <section className="mkt-roadmaps" aria-labelledby="roadmaps-heading">
          <div className="container">
            <h2 id="roadmaps-heading" className="sr-only">All Roadmaps</h2>
            <div className="mkt-roadmaps__list">
              {roadmaps.map(r => (
                <article key={r.id} className="mkt-roadmap-card">
                  <div className="mkt-roadmap-card__icon" style={{ background: r.color + '15', color: r.color }}>
                    {r.emoji}
                  </div>
                  <div className="mkt-roadmap-card__body">
                    <div className="mkt-roadmap-card__meta">
                      <span className="chip chip-blue" style={{ fontSize: 11 }}>{r.level}</span>
                      <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.duration} · {r.effort}</span>
                    </div>
                    <h3>{r.title}</h3>
                    <p className="mkt-roadmap-card__subtitle">{r.subtitle}</p>
                    <div className="mkt-roadmap-card__phases">
                      {r.phases.map((p, i) => (
                        <div key={p} className="mkt-roadmap-card__phase">
                          <span className="mkt-roadmap-card__phase-num" style={{ background: r.color + '20', color: r.color }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mkt-roadmap-card__outcome">
                      <span>🏆</span> <span><strong>Outcome:</strong> {r.outcome}</span>
                    </div>
                    <Link to={`/course/${r.id}`} className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
                      View Full Roadmap →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mkt-cta" aria-label="Pick a roadmap">
          <div className="container">
            <div className="mkt-cta__inner">
              <h2>Pick a roadmap. Start today.</h2>
              <p>Every roadmap is free. Sign up and start your first day in under 2 minutes.</p>
              <div className="mkt-cta__btns">
                <Link to="/sign-up" className="btn btn-dark btn-lg">Start Learning Free</Link>
                <Link to="/courses" className="btn btn-outline-white btn-lg">Browse All Courses</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
