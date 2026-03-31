import { Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'

const faqs = [
  { q: 'Is LearnHub really free?', a: 'Yes — completely. All 5 courses, 200+ lessons, progress tracking, and certificates are free. We believe quality education should be accessible to everyone.' },
  { q: 'Will it stay free?', a: 'The Free plan stays free forever. We plan to introduce an optional Pro plan with premium features like mentorship and priority support, but the core learning experience will always be free.' },
  { q: 'What is included in the Pro plan?', a: 'The Pro plan (coming soon) will include priority support, early access to new courses, 1-on-1 mentorship sessions, and access to a private community. It is optional — the Free plan covers everything you need to complete any course.' },
  { q: 'Do I need a credit card to sign up?', a: 'No. Creating a free account requires only your name and email address. No payment information is ever required for the Free plan.' },
  { q: 'Can I enroll in multiple courses at once?', a: 'Yes. You can enroll in all 5 courses simultaneously and work through them at your own pace. Your progress for each course is tracked independently.' },
  { q: 'How do I earn a certificate?', a: 'Complete all lessons in any course by marking them as done. Once you reach 100% completion, a certificate of completion is generated for you to download and share.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing — Free Developer Courses"
        description="LearnHub is free forever. All 5 courses, 200+ lessons, progress tracking, and certificates — zero cost, no credit card required. Optional Pro plan coming soon."
        path="/pricing"
        keywords="learnhub pricing, free coding courses, free developer education, no credit card coding course"
        breadcrumb={[{ name: 'Pricing', path: '/pricing' }]}
        jsonLd={FAQ_SCHEMA}
      />

      <Navbar />

      <main>
        <section className="mkt-page-hero">
          <div className="container">
            <h1>Transparent Pricing</h1>
            <p className="mkt-page-hero__sub">
              Everything you need is free. No paywalls, no limits, no surprises.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="mkt-pricing" aria-labelledby="pricing-cards-heading">
          <div className="container">
            <h2 id="pricing-cards-heading" className="sr-only">Pricing Plans</h2>
            <div className="mkt-pricing__grid">
              {/* Free */}
              <div className="mkt-pricing__card mkt-pricing__card--featured">
                <div className="mkt-pricing__badge">Current Plan</div>
                <h3>Free</h3>
                <div className="mkt-pricing__price">
                  <span className="mkt-pricing__amount">$0</span>
                  <span className="mkt-pricing__period">/ forever</span>
                </div>
                <p className="mkt-pricing__desc">Everything you need to master development skills.</p>
                <ul className="mkt-pricing__features" aria-label="Free plan features">
                  {[
                    'All 5 courses (200+ lessons)',
                    'Day-by-day structured roadmaps',
                    'Progress tracking & checkpoints',
                    'Certificate of completion',
                    'Self-paced learning',
                    'Multi-device sync',
                    'Email support',
                  ].map(f => <li key={f}><span aria-hidden="true">✓</span> {f}</li>)}
                </ul>
                <Link to="/sign-up" className="btn btn-primary btn-full">Get Started Free</Link>
              </div>

              {/* Pro */}
              <div className="mkt-pricing__card">
                <div className="mkt-pricing__badge mkt-pricing__badge--soon">Coming Soon</div>
                <h3>Pro</h3>
                <div className="mkt-pricing__price">
                  <span className="mkt-pricing__amount">$9</span>
                  <span className="mkt-pricing__period">/ month</span>
                </div>
                <p className="mkt-pricing__desc">For learners who want extra support and community.</p>
                <ul className="mkt-pricing__features" aria-label="Pro plan features">
                  {[
                    'Everything in Free',
                    'Priority support (24h response)',
                    'Early access to new courses',
                    '1-on-1 mentorship session / month',
                    'Private Discord community',
                    'Resume & portfolio review',
                    'Job board access',
                  ].map(f => <li key={f}><span aria-hidden="true">✓</span> {f}</li>)}
                </ul>
                <button className="btn btn-ghost btn-full" disabled>Notify Me When Available</button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mkt-faq" aria-labelledby="faq-heading">
          <div className="container">
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            <div className="mkt-faq__list">
              {faqs.map(f => (
                <details key={f.q} className="mkt-faq__item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mkt-cta" aria-label="Start for free">
          <div className="container">
            <div className="mkt-cta__inner">
              <h2>Start free. Stay free.</h2>
              <p>No credit card. No trial. No catch. Your learning journey starts now.</p>
              <div className="mkt-cta__btns">
                <Link to="/sign-up" className="btn btn-dark btn-lg">Create Free Account</Link>
                <Link to="/courses" className="btn btn-outline-white btn-lg">Browse Courses First</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
