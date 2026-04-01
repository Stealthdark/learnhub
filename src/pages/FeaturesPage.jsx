import { Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'

const HOW_TO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to learn programming with LearnHub',
  description: 'Follow structured roadmaps to master programming skills',
  step: [
    { '@type': 'HowToStep', name: 'Create a free account', text: 'Sign up in 30 seconds — no credit card needed.' },
    { '@type': 'HowToStep', name: 'Choose a course', text: 'Pick from 5 structured learning roadmaps.' },
    { '@type': 'HowToStep', name: 'Follow day-by-day', text: 'Complete each day\'s goals and resources.' },
    { '@type': 'HowToStep', name: 'Track your progress', text: 'Mark lessons complete and watch your progress grow.' },
    { '@type': 'HowToStep', name: 'Earn your certificate', text: 'Complete the course and receive your certificate.' },
  ],
}

const FEATURES_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does progress tracking work on LearnHub?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each lesson has a checkbox. Mark it complete and your progress bar updates instantly. You can see your overall progress and per-phase progress at a glance. Progress is saved to your account and syncs across all devices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I learn on mobile or tablet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. LearnHub is fully responsive and works on any device — laptop, tablet, or phone. Your progress syncs automatically so you can switch between devices seamlessly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do certificates work on LearnHub?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Complete all lessons in any course by marking them as done. Once you reach 100% completion, a certificate of completion is generated automatically. You can download it as a PDF and share it on LinkedIn or in your portfolio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I enroll in multiple courses at the same time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can enroll in all 5 courses simultaneously and track progress independently for each. Your dashboard shows all active courses and their completion percentages.',
      },
    },
  ],
}

const features = [
  { icon: '🗺️', title: 'Structured Roadmaps', desc: 'Every course is a day-by-day plan, not a random collection of videos. You always know exactly what to learn next, eliminating decision fatigue and tutorial paralysis.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Mark each lesson complete with a checkbox. Watch your progress bar fill up. See your week-by-week momentum with visual breakdowns per phase.' },
  { icon: '📅', title: 'Daily Lessons', desc: 'Each day has a clear title, learning goal, curated resources, and practical exercises. 2-3 hours a day is all it takes to complete any course on time.' },
  { icon: '🆓', title: 'Free Forever', desc: 'All 5 courses, 200+ lessons, progress tracking, and certificates are included at zero cost. No paywalls, no trial periods, no freemium limits.' },
  { icon: '⏱️', title: 'Self-Paced', desc: 'No deadlines. Learn on your schedule. Whether you complete a day in the morning or late at night, your progress is saved and waiting for you.' },
  { icon: '🏆', title: 'Certificate Ready', desc: 'Complete any course and earn a certificate of completion you can share on LinkedIn or include in your portfolio. A tangible milestone for every roadmap.' },
  { icon: '📱', title: 'Any Device', desc: 'LearnHub is fully responsive. Learn from your laptop, tablet, or phone. Your progress syncs automatically across all your devices.' },
  { icon: '📚', title: 'Multiple Enrollments', desc: 'Enroll in all 5 courses simultaneously. Work through them in parallel or focus on one at a time — it\'s entirely your choice.' },
  { icon: '🔒', title: 'Secure Accounts', desc: 'Email-verified accounts with JWT authentication. Your learning data is private, secure, and only accessible to you.' },
]

export default function FeaturesPage() {
  return (
    <>
      <SEO
        title="Platform Features"
        description="LearnHub features: structured day-by-day roadmaps, progress tracking, daily lessons, certificates, self-paced learning, and more — all completely free."
        path="/features"
        keywords="learnhub features, progress tracking, learning roadmap features, free online learning, developer platform"
        breadcrumb={[{ name: 'Features', path: '/features' }]}
        jsonLd={[HOW_TO_SCHEMA, FEATURES_FAQ_SCHEMA]}
      />

      <Navbar />

      <main>
        <section className="mkt-page-hero">
          <div className="container">
            <h1>Everything you need to learn, for free</h1>
            <p className="mkt-page-hero__sub">
              Built for developers who want structure, not subscriptions.
            </p>
            <Link to="/sign-up" className="btn btn-primary btn-lg">Get Started — It's Free</Link>
          </div>
        </section>

        <section className="mkt-features-page" aria-labelledby="features-heading">
          <div className="container">
            <h2 id="features-heading" className="sr-only">Platform Features</h2>
            <div className="mkt-features-page__grid">
              {features.map(f => (
                <article key={f.title} className="mkt-feature-card">
                  <div className="mkt-feature-card__icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mkt-how" aria-labelledby="how-features-heading">
          <div className="container">
            <h2 id="how-features-heading">How it works</h2>
            <div className="mkt-how__grid">
              {[
                { n: '01', title: 'Sign Up Free', desc: 'Create your account in 30 seconds. Email verification only — no credit card.' },
                { n: '02', title: 'Enroll in a Course', desc: 'Choose from 5 structured roadmaps. Enroll in one or all of them simultaneously.' },
                { n: '03', title: 'Follow the Roadmap', desc: 'Each day has clear goals, curated resources, and a practical exercise. No guesswork.' },
                { n: '04', title: 'Track & Complete', desc: 'Check off lessons, see your progress grow, and earn your completion certificate.' },
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

        <section className="mkt-cta" aria-label="Start learning">
          <div className="container">
            <div className="mkt-cta__inner">
              <h2>Ready to start?</h2>
              <p>Every feature is free. Sign up and start your first roadmap today.</p>
              <div className="mkt-cta__btns">
                <Link to="/sign-up" className="btn btn-dark btn-lg">Start Learning Free</Link>
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
