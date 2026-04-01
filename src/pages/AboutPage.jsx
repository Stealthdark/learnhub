import { Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About LearnHub"
        description="LearnHub is a free, structured learning platform for developers. We believe every developer deserves a clear, actionable path to real-world skills — without paywalls or tutorial chaos."
        path="/about"
        keywords="about learnhub, developer learning platform, free coding courses, structured learning"
        breadcrumb={[{ name: 'About', path: '/about' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About LearnHub',
          description: 'LearnHub is a free, structured learning platform for developers.',
          url: 'https://learnhubdev.com/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'LearnHub',
            url: 'https://learnhubdev.com',
            foundingDate: '2024',
            description: 'Free structured learning roadmaps for developers.',
            sameAs: [
              'https://twitter.com/learnhubdev',
              'https://github.com/learnhubdev',
              'https://linkedin.com/company/learnhubdev',
            ],
          },
        }}
      />

      <Navbar />

      <main>
        {/* Hero */}
        <section className="mkt-page-hero">
          <div className="container">
            <h1>About LearnHub</h1>
            <p className="mkt-page-hero__sub">
              We built the learning platform we wished existed when we were starting out.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mkt-content-section">
          <div className="container mkt-content-section__narrow">
            <h2>Our Mission</h2>
            <p>
              LearnHub exists to give every developer — regardless of background or budget — a clear, structured path to real-world skills. We believe the biggest barrier to learning isn't ability; it's direction.
            </p>
            <p>
              The internet is flooded with tutorials, videos, and courses. But most learners don't need <em>more</em> content — they need a <strong>map</strong>. LearnHub provides exactly that: day-by-day roadmaps that eliminate decision fatigue and keep you moving forward.
            </p>

            <h2>Why Structured Roadmaps?</h2>
            <p>
              Traditional courses dump information at you and hope it sticks. Structured roadmaps work differently:
            </p>
            <ul className="mkt-content-list">
              <li><strong>Day-by-day goals</strong> — you always know what to do today</li>
              <li><strong>Curated resources</strong> — the best resource for each topic, not every resource</li>
              <li><strong>Practical projects</strong> — every phase ends with something you built</li>
              <li><strong>Progress tracking</strong> — visual momentum keeps you accountable</li>
            </ul>

            <h2>Free Forever. No Excuses.</h2>
            <p>
              Every feature on LearnHub is free. All 5 courses. All 200+ lessons. Progress tracking. Certificates. We don't believe talent should be gated by a credit card. If you have internet access, you have access to quality education.
            </p>

            <h2>What We Offer Today</h2>
            <div className="mkt-courses-simple-grid">
              {[
                { emoji: '⚡', name: '30-Day Node.js Mastery', id: 'nodejs-30day' },
                { emoji: '🎨', name: 'Frontend Development Roadmap', id: 'frontend-roadmap' },
                { emoji: '🗄️', name: 'SQL & MongoDB 20-Day Plan', id: 'sql-mongodb-20day' },
                { emoji: '🤖', name: 'AI-First Web Dev — 49 Days', id: 'ai-first-webdev-49day' },
                { emoji: '📊', name: 'Smart Business Analyst Roadmap', id: 'smart-ba-roadmap' },
              ].map(c => (
                <Link key={c.id} to={`/courses/${c.id}`} className="mkt-courses-simple-card">
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mkt-cta" aria-label="Get started">
          <div className="container">
            <div className="mkt-cta__inner">
              <h2>Start your learning journey today</h2>
              <p>Pick a roadmap and follow it. That's all it takes.</p>
              <div className="mkt-cta__btns">
                <Link to="/sign-up" className="btn btn-dark btn-lg">Get Started Free</Link>
                <Link to="/courses" className="btn btn-outline-white btn-lg">Browse Courses</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
