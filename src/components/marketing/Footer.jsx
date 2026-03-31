import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mkt-footer" role="contentinfo">
      <div className="container">
        <div className="mkt-footer__grid">
          <div className="mkt-footer__brand">
            <Link to="/" className="mkt-footer__logo">
              <img src="/assets/og/logo/learnhub-logo.png" alt="LearnHub" width="32" height="32" />
              <span>LearnHub</span>
            </Link>
            <p>Structured learning roadmaps for developers. Free, self-paced, real-world skills.</p>
          </div>

          <nav aria-label="Courses footer navigation">
            <h3 className="mkt-footer__heading">Courses</h3>
            <ul>
              <li><Link to="/course/nodejs-30day">Node.js Mastery</Link></li>
              <li><Link to="/course/frontend-roadmap">Frontend Development</Link></li>
              <li><Link to="/course/sql-mongodb-20day">SQL &amp; MongoDB</Link></li>
              <li><Link to="/course/ai-first-webdev-49day">AI-First Web Dev</Link></li>
              <li><Link to="/course/smart-ba-roadmap">Business Analysis</Link></li>
            </ul>
          </nav>

          <nav aria-label="Platform footer navigation">
            <h3 className="mkt-footer__heading">Platform</h3>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/roadmaps">Roadmaps</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </nav>

          <nav aria-label="Account footer navigation">
            <h3 className="mkt-footer__heading">Account</h3>
            <ul>
              <li><Link to="/sign-up">Get Started Free</Link></li>
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mkt-footer__bottom">
          <p>© {year} LearnHub. All rights reserved.</p>
          <p>Free forever. No credit card required.</p>
        </div>
      </div>
    </footer>
  )
}
