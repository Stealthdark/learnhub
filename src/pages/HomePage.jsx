import { Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LearnHub',
  url: 'https://learnhubdev.com',
  description: 'Free, structured learning roadmaps for developers',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://learnhubdev.com/courses?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const COURSE_LIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'LearnHub Developer Courses',
  description: 'Free structured learning roadmaps for developers',
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Course', name: '30-Day Node.js Mastery Plan', description: 'Master Node.js, Express, and backend development in 30 structured days.', provider: { '@type': 'Organization', name: 'LearnHub' }, isAccessibleForFree: true, educationalLevel: 'Intermediate', timeRequired: 'P30D', url: 'https://learnhubdev.com/courses/nodejs-30day' } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Course', name: 'Frontend Development Roadmap', description: 'Master HTML, CSS, and JavaScript with a 60-day structured roadmap.', provider: { '@type': 'Organization', name: 'LearnHub' }, isAccessibleForFree: true, educationalLevel: 'Beginner', timeRequired: 'P60D', url: 'https://learnhubdev.com/courses/frontend-roadmap' } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Course', name: 'SQL & MongoDB 20-Day Plan', description: 'Learn relational and NoSQL databases in 20 days.', provider: { '@type': 'Organization', name: 'LearnHub' }, isAccessibleForFree: true, educationalLevel: 'Beginner', timeRequired: 'P20D', url: 'https://learnhubdev.com/courses/sql-mongodb-20day' } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Course', name: 'AI-First Web Dev — 49 Days', description: 'Build production AI apps with React, Next.js, and modern AI tools in 49 days.', provider: { '@type': 'Organization', name: 'LearnHub' }, isAccessibleForFree: true, educationalLevel: 'Advanced', timeRequired: 'P49D', url: 'https://learnhubdev.com/courses/ai-first-webdev-49day' } },
    { '@type': 'ListItem', position: 5, item: { '@type': 'Course', name: 'Smart Business Analyst Roadmap', description: 'Structured path to become a business analyst with real-world skills.', provider: { '@type': 'Organization', name: 'LearnHub' }, isAccessibleForFree: true, url: 'https://learnhubdev.com/courses/smart-ba-roadmap' } },
  ],
}

const HOME_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is LearnHub?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LearnHub is a free, structured learning platform for developers. It provides day-by-day roadmaps across 5 domains: Node.js, Frontend Development, SQL & MongoDB, AI-First Web Dev, and Business Analysis — all completely free with no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is LearnHub different from other coding platforms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LearnHub focuses on structured day-by-day roadmaps rather than random videos. Every course tells you exactly what to do each day, which resource to use, and what to build — eliminating decision fatigue and tutorial paralysis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is LearnHub really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. All 5 courses, 200+ lessons, progress tracking, and certificates are free forever. No credit card, no trial period, no paywalls.',
      },
    },
    {
      '@type': 'Question',
      name: 'What courses does LearnHub offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LearnHub offers 5 structured courses: 30-Day Node.js Mastery (Intermediate, 2-3 hrs/day), Frontend Development Roadmap (Beginner, 60 days, 2 hrs/day), SQL & MongoDB 20-Day Plan (Beginner, 2 hrs/day), AI-First Web Dev 49 Days (Advanced, 2-3 hrs/day), and the Smart Business Analyst Roadmap (Beginner, self-paced, 1-2 hrs/day).',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to complete a LearnHub course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Courses range from 20 days (SQL & MongoDB) to 60 days (Frontend Development) at 1-3 hours per day. The Business Analysis roadmap is self-paced. All courses can be completed at your own speed — there are no deadlines.',
      },
    },
  ],
}

const courses = [
  { id: 'nodejs-30day', emoji: '⚡', title: '30-Day Node.js Mastery', subtitle: 'Frontend → Fullstack · Backend Blueprint', level: 'Intermediate', duration: '30 Days', color: '#7c4dff' },
  { id: 'frontend-roadmap', emoji: '🎨', title: 'Frontend Development', subtitle: 'HTML · CSS · JavaScript · DOM', level: 'Beginner', duration: '60 Days', color: '#1a73e8' },
  { id: 'sql-mongodb-20day', emoji: '🗄️', title: 'SQL & MongoDB', subtitle: 'Relational + NoSQL Databases', level: 'Beginner', duration: '20 Days', color: '#007b83' },
  { id: 'ai-first-webdev-49day', emoji: '🤖', title: 'AI-First Web Dev', subtitle: 'React · Next.js · AI Integration', level: 'Advanced', duration: '49 Days', color: '#e37400' },
  { id: 'smart-ba-roadmap', emoji: '📊', title: 'Business Analysis', subtitle: 'Requirements · Analysis · Stakeholders', level: 'Beginner', duration: 'Self-Paced', color: '#137333' },
]

const features = [
  { icon: '🗺️', title: 'Structured Roadmaps', desc: 'Day-by-day plans that eliminate guesswork. Know exactly what to learn next.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Mark lessons complete, see your momentum, stay motivated with visual progress.' },
  { icon: '🆓', title: 'Free Forever', desc: 'All 5 courses, 200+ lessons, certificates — zero cost, no credit card.' },
  { icon: '⏱️', title: 'Self-Paced', desc: 'Learn at your own speed. No deadlines, no pressure, just focused progress.' },
]

export default function HomePage() {
  return (
    <>
      <SEO
        title="Structured Learning Roadmaps for Developers"
        description="Stop tutorial-hopping. LearnHub gives you day-by-day learning paths built for real-world skills — free, self-paced, and structured. Master Node.js, Frontend, Databases, AI, and more."
        path="/"
        keywords="learn programming, coding roadmap, nodejs course, frontend development, html css javascript, web development, free online courses, self-paced learning, developer roadmap"
        jsonLd={[WEBSITE_SCHEMA, COURSE_LIST_SCHEMA, HOME_FAQ_SCHEMA]}
      />

      <Navbar />

      {/* Hero */}
      <section className="mkt-hero" aria-label="Hero section">
        <div className="mkt-hero__inner">
          <div className="mkt-hero__badge">
            <span>✨ New</span> AI-First Web Dev roadmap — 49 days to production
          </div>
          <h1>Learn to code with <em>structured</em> roadmaps</h1>
          <p className="mkt-hero__sub">
            Stop tutorial-hopping. LearnHub gives you day-by-day learning paths
            built for real-world skills — free, self-paced, and structured.
          </p>
          <div className="mkt-hero__ctas">
            <Link to="/sign-up" className="btn btn-primary btn-lg">Start Learning Free →</Link>
            <Link to="/courses" className="btn btn-secondary btn-lg">Browse Courses</Link>
          </div>
          <p className="mkt-hero__trust">No credit card · No deadline · Free forever</p>
        </div>
      </section>

      {/* Stats */}
      <section className="mkt-stats" aria-label="Platform statistics">
        <div className="container">
          <div className="mkt-stats__grid">
            {[
              { value: '5', label: 'Structured Courses' },
              { value: '200+', label: 'Day-by-Day Lessons' },
              { value: '100%', label: 'Free Forever' },
              { value: '4', label: 'Tech Domains' },
            ].map(s => (
              <div key={s.label} className="mkt-stats__item">
                <span className="mkt-stats__value">{s.value}</span>
                <span className="mkt-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mkt-courses" aria-labelledby="courses-heading">
        <div className="container">
          <div className="mkt-section-header">
            <h2 id="courses-heading">5 Courses. Zero Cost.</h2>
            <p>Every course is a structured roadmap — not a random collection of videos.</p>
          </div>
          <div className="mkt-courses__grid">
            {courses.map(c => (
              <article key={c.id} className="mkt-course-card">
                <div className="mkt-course-card__icon" style={{ background: c.color + '18', color: c.color }}>
                  {c.emoji}
                </div>
                <div className="mkt-course-card__body">
                  <div className="mkt-course-card__meta">
                    <span className="chip chip-blue" style={{ fontSize: 11 }}>{c.level}</span>
                    <span style={{ fontSize: 12, color: 'var(--text3)' }}>{c.duration}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.subtitle}</p>
                  <Link to={`/courses/${c.id}`} className="mkt-course-card__link" style={{ color: c.color }}>
                    View Roadmap →
                  </Link>
                </div>
              </article>
            ))}
            <div className="mkt-course-card mkt-course-card--coming-soon">
              <div className="mkt-course-card__icon">🔜</div>
              <div className="mkt-course-card__body">
                <h3>More Coming Soon</h3>
                <p>React, DevOps, TypeScript and more roadmaps in the pipeline.</p>
                <Link to="/sign-up" className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>Get Notified</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mkt-features" aria-labelledby="features-heading">
        <div className="container">
          <div className="mkt-section-header">
            <h2 id="features-heading">Why LearnHub Works</h2>
            <p>Built for developers who want to stop spinning and start shipping.</p>
          </div>
          <div className="mkt-features__grid">
            {features.map(f => (
              <div key={f.title} className="mkt-feature-tile">
                <div className="mkt-feature-tile__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/features" className="btn btn-ghost">See All Features →</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mkt-how" aria-labelledby="how-heading">
        <div className="container">
          <h2 id="how-heading">Start learning in 3 steps</h2>
          <div className="mkt-how__grid">
            {[
              { n: '01', title: 'Pick a Roadmap', desc: 'Choose from 5 structured learning paths across different tech domains.' },
              { n: '02', title: 'Follow Day by Day', desc: 'Each day has clear goals, curated resources, and a practical project.' },
              { n: '03', title: 'Track & Complete', desc: 'Mark lessons done, watch your progress bar fill up, earn your certificate.' },
            ].map(step => (
              <div key={step.n} className="mkt-how__step">
                <div className="mkt-how__step-num">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mkt-testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <h2 id="testimonials-heading">Learners love LearnHub</h2>
          <div className="mkt-testimonials__grid">
            {[
              { name: 'Aisha K.', role: 'Junior Developer', text: 'The Node.js roadmap got me from zero to building REST APIs in 30 days. The day-by-day structure removed all the decision fatigue.' },
              { name: 'Marcus T.', role: 'Career Switcher', text: 'I tried so many courses before LearnHub. The structured path made all the difference — I always knew exactly what to do next.' },
              { name: 'Priya R.', role: 'CS Student', text: 'The AI-First Web Dev course is ahead of everything else out there. Real tools, real projects, and it\'s completely free.' },
            ].map(t => (
              <blockquote key={t.name} className="mkt-testimonial-card">
                <p>"{t.text}"</p>
                <footer>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mkt-pricing-preview" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="mkt-section-header">
            <h2 id="pricing-heading">Simple pricing</h2>
            <p>Everything you need is free. No paywalls, no upsells.</p>
          </div>
          <div className="mkt-pricing-preview__cards">
            <div className="mkt-pricing-card mkt-pricing-card--featured">
              <div className="mkt-pricing-card__badge">Current Plan</div>
              <h3>Free</h3>
              <div className="mkt-pricing-card__price">$0 <span>/ forever</span></div>
              <ul>
                {['All 5 courses', '200+ structured lessons', 'Progress tracking', 'Certificate of completion', 'Self-paced learning'].map(f => (
                  <li key={f}><span>✓</span> {f}</li>
                ))}
              </ul>
              <Link to="/sign-up" className="btn btn-primary btn-full">Get Started Free</Link>
            </div>
            <div className="mkt-pricing-card">
              <div className="mkt-pricing-card__badge mkt-pricing-card__badge--soon">Coming Soon</div>
              <h3>Pro</h3>
              <div className="mkt-pricing-card__price">$9 <span>/ month</span></div>
              <ul>
                {['Everything in Free', 'Priority support', 'Early access to new courses', '1-on-1 mentorship session', 'Private Discord community'].map(f => (
                  <li key={f}><span>✓</span> {f}</li>
                ))}
              </ul>
              <button className="btn btn-ghost btn-full" disabled>Notify Me</button>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text3)' }}>
            <Link to="/pricing" style={{ color: 'var(--primary)' }}>See full pricing details →</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mkt-cta" aria-label="Call to action">
        <div className="container">
          <div className="mkt-cta__inner">
            <h2>Ready to build real skills?</h2>
            <p>Join thousands of developers learning with structured roadmaps. Start your first course today — it's free.</p>
            <div className="mkt-cta__btns">
              <Link to="/sign-up" className="btn btn-dark btn-lg">Start Learning Free</Link>
              <Link to="/courses" className="btn btn-outline-white btn-lg">Browse All Courses</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
