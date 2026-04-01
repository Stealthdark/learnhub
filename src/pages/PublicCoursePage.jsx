import { useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { apiEnrollCourse } from '../utils/api'

const SITE_URL = 'https://learnhubdev.com'

// ── Course base data ────────────────────────────────────────────
const COURSES = [
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
    dailyEffort: '2–3 Hours / Day',
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
    dailyEffort: '2 Hours / Day',
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
    dailyEffort: '2 Hours / Day',
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
    dailyEffort: '2–3 Hours / Day',
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
    dailyEffort: '1–2 Hours / Day',
    prerequisites: 'None',
    outcome: 'BA Role Readiness',
  },
]

// ── OG images ───────────────────────────────────────────────────
const COURSE_OG_IMAGES = {
  'nodejs-30day':          '/assets/og/nodejs-og.png',
  'frontend-roadmap':      '/assets/og/frontend-og.png',
  'sql-mongodb-20day':     '/assets/og/sql-mongodb-og.png',
  'ai-first-webdev-49day': '/assets/og/ai-first-webdev-og.png',
  'smart-ba-roadmap':      '/assets/og/smart-ba-og.png',
}

// ── SEO metadata ────────────────────────────────────────────────
const COURSE_SEO = {
  'nodejs-30day': {
    description: 'Master Node.js in 30 structured days. Build production REST APIs with Express, connect to SQL and MongoDB databases, implement JWT auth, and deploy to the cloud. Free, self-paced, certificate included.',
    keywords: '30 day nodejs course, node.js mastery, express.js tutorial, rest api nodejs, backend development roadmap, nodejs for beginners, free nodejs course 2025',
  },
  'frontend-roadmap': {
    description: 'Go from zero to building interactive websites in 60 structured days. Master HTML5, CSS3, and JavaScript ES6+ with daily lessons. Free, beginner-friendly, certificate included.',
    keywords: 'frontend development course, html css javascript course, web development for beginners, 60 day frontend roadmap, learn html css, javascript es6 course free 2025',
  },
  'sql-mongodb-20day': {
    description: 'Learn SQL and MongoDB in 20 structured days. Master relational schema design, complex queries, document modeling, and Node.js database integration. Free, beginner-friendly, certificate included.',
    keywords: 'sql course free, mongodb course, database course for developers, sql and mongodb, relational vs nosql, 20 day database course, nodejs database integration 2025',
  },
  'ai-first-webdev-49day': {
    description: 'Build production AI-powered web apps in 49 structured days. Master React, Next.js, Nuxt, OpenAI API, Claude API, and Playwright testing. Free, advanced course, certificate included.',
    keywords: 'ai web development course, nextjs course free, react next.js nuxt course, openai api tutorial, build ai apps, playwright testing, ai first web dev 2025',
  },
  'smart-ba-roadmap': {
    description: 'Become a Business Analyst with a structured self-paced roadmap. Cover requirements engineering, BPMN process modeling, Agile & Scrum, JIRA, Confluence, and career preparation. Free, certificate included.',
    keywords: 'business analyst course free, ba roadmap, cbap preparation, requirements engineering course, agile business analysis, jira confluence training, business analyst career 2025',
  },
}

// ── Schema.org teaches metadata ─────────────────────────────────
const COURSE_SCHEMA_META = {
  'nodejs-30day': {
    teaches: ['Node.js runtime and event loop', 'Express.js middleware and routing', 'REST API design and implementation', 'JWT authentication', 'SQL and MongoDB integration', 'File uploads and email sending', 'Cloud deployment'],
    coursePrerequisites: 'JavaScript ES6+',
    competencyRequired: 'Basic JavaScript programming',
  },
  'frontend-roadmap': {
    teaches: ['Semantic HTML5', 'CSS3 Flexbox and Grid', 'Responsive web design', 'Vanilla JavaScript ES6+', 'DOM manipulation', 'Web accessibility fundamentals', 'Frontend performance optimization'],
    coursePrerequisites: 'None — beginner-friendly',
    competencyRequired: 'None',
  },
  'sql-mongodb-20day': {
    teaches: ['SQL queries, joins, and aggregations', 'Relational database schema design', 'MongoDB document modeling and CRUD', 'Database indexing and optimization', 'Node.js database integration'],
    coursePrerequisites: 'Basic programming knowledge',
    competencyRequired: 'Basic programming',
  },
  'ai-first-webdev-49day': {
    teaches: ['React components and hooks', 'Next.js server-side rendering', 'Nuxt.js fundamentals', 'OpenAI and Claude API integration', 'AI-first application architecture', 'Playwright end-to-end testing', 'Production deployment of AI apps'],
    coursePrerequisites: 'HTML, CSS, and JavaScript',
    competencyRequired: 'Intermediate web development',
  },
  'smart-ba-roadmap': {
    teaches: ['Business requirements gathering and documentation', 'User story writing', 'BPMN process modeling', 'Agile and Scrum methodology', 'Stakeholder management', 'JIRA, Confluence, and Visio', 'BA interview and certification preparation'],
    coursePrerequisites: 'None — beginner-friendly',
    competencyRequired: 'None',
  },
}

// ── What you'll learn ───────────────────────────────────────────
const COURSE_BENEFITS = {
  'nodejs-30day': [
    'Build production-ready REST APIs with Node.js and Express',
    'Master middleware, routing, and authentication patterns',
    'Connect to SQL and NoSQL databases from Node.js',
    'Implement JWT auth, file uploads, and email sending',
    'Deploy Node.js applications to cloud platforms',
    'Write clean, scalable backend architecture',
  ],
  'frontend-roadmap': [
    'Master semantic HTML5 and modern CSS3 from scratch',
    'Build fully responsive layouts with Flexbox and Grid',
    'Write modern JavaScript ES6+ with confidence',
    'Manipulate the DOM and handle user interactions',
    'Build a portfolio-ready responsive website',
    'Understand web accessibility and performance fundamentals',
  ],
  'sql-mongodb-20day': [
    'Write complex SQL queries, joins, and aggregations',
    'Design relational database schemas from scratch',
    'Master MongoDB document modeling and CRUD operations',
    'Apply indexing strategies and query optimization',
    'Integrate databases into Node.js applications',
    'Choose the right database for real-world projects',
  ],
  'ai-first-webdev-49day': [
    'Build production AI-powered apps with React and Next.js',
    'Integrate OpenAI, Claude, and modern AI APIs',
    'Master server-side rendering with Next.js and Nuxt',
    'Write end-to-end tests with Playwright',
    'Deploy AI web apps to production environments',
    'Understand AI tooling, prompting, and responsible AI usage',
  ],
  'smart-ba-roadmap': [
    'Write clear business requirements and user stories',
    'Model business processes using industry-standard tools',
    'Facilitate stakeholder workshops and elicitation sessions',
    'Work confidently in Agile and Scrum environments',
    'Use BA tools like JIRA, Confluence, and Visio',
    'Prepare for BA certifications and job interviews',
  ],
}

// ── Who it's for ────────────────────────────────────────────────
const COURSE_WHO_ITS_FOR = {
  'nodejs-30day': [
    { icon: '🎨', title: 'Frontend developers', desc: 'Going fullstack and building your first backend' },
    { icon: '⚙️', title: 'JavaScript developers', desc: 'Ready to write server-side code and real APIs' },
    { icon: '🚀', title: 'Bootcamp graduates', desc: 'Looking to add backend skills to your portfolio' },
  ],
  'frontend-roadmap': [
    { icon: '🌱', title: 'Complete beginners', desc: 'Zero coding experience — this is your starting point' },
    { icon: '🎨', title: 'Designers learning code', desc: 'Turning your design skills into working websites' },
    { icon: '🔄', title: 'Career changers', desc: 'Entering tech from a non-technical background' },
  ],
  'sql-mongodb-20day': [
    { icon: '⚡', title: 'Node.js developers', desc: 'Adding a proper data layer to your backend apps' },
    { icon: '🎓', title: 'CS students', desc: 'Bridging theory and practical database work' },
    { icon: '🔧', title: 'Backend developers', desc: 'Getting confident with both SQL and NoSQL' },
  ],
  'ai-first-webdev-49day': [
    { icon: '⚛️', title: 'React developers', desc: 'Ready to ship production AI-powered applications' },
    { icon: '🌐', title: 'Full-stack developers', desc: 'Adding AI integration to your existing skills' },
    { icon: '💡', title: 'Product builders', desc: 'Building real products with modern AI APIs' },
  ],
  'smart-ba-roadmap': [
    { icon: '🔄', title: 'Career changers', desc: 'Moving into tech without a coding background' },
    { icon: '💻', title: 'Developers going product', desc: 'Transitioning to BA or product management roles' },
    { icon: '🤝', title: 'Non-technical professionals', desc: 'Working closely with dev teams and need the language' },
  ],
}

// ── Curriculum phases ───────────────────────────────────────────
const COURSE_CURRICULUM = {
  'nodejs-30day': [
    { phase: 'Phase 1', label: 'Days 1–7', title: 'Node.js Foundations', topics: ['Runtime & event loop', 'Modules & npm', 'File I/O & streams', 'HTTP basics'], count: 7 },
    { phase: 'Phase 2', label: 'Days 8–14', title: 'Express & REST APIs', topics: ['Routing & controllers', 'Middleware patterns', 'Request validation', 'Error handling'], count: 7 },
    { phase: 'Phase 3', label: 'Days 15–21', title: 'Databases', topics: ['SQL with better-sqlite3', 'MongoDB & Mongoose', 'Schema design', 'CRUD operations'], count: 7 },
    { phase: 'Phase 4', label: 'Days 22–28', title: 'Auth & Security', topics: ['JWT authentication', 'bcrypt & hashing', 'Rate limiting', 'File uploads'], count: 7 },
    { phase: 'Phase 5', label: 'Days 29–30', title: 'Deployment & Capstone', topics: ['Cloud deployment', 'Environment config', 'Final API project'], count: 2 },
  ],
  'frontend-roadmap': [
    { phase: 'Phase 1', label: 'Days 1–15', title: 'HTML Mastery', topics: ['Semantic HTML5', 'Forms & inputs', 'Accessibility', 'SEO basics'], count: 15 },
    { phase: 'Phase 2', label: 'Days 16–30', title: 'CSS Mastery', topics: ['Flexbox & Grid', 'Responsive design', 'Animations', 'CSS variables'], count: 15 },
    { phase: 'Phase 3', label: 'Days 31–50', title: 'JavaScript ES6+', topics: ['Variables & scope', 'DOM manipulation', 'Events & async', 'APIs & fetch'], count: 20 },
    { phase: 'Phase 4', label: 'Days 51–60', title: 'Portfolio Project', topics: ['Multi-page site', 'Responsive layout', 'JS interactions', 'Performance basics'], count: 10 },
  ],
  'sql-mongodb-20day': [
    { phase: 'Phase 1', label: 'Days 1–10', title: 'SQL Foundations', topics: ['SELECT & WHERE', 'JOINs & relationships', 'Schema design', 'Transactions & indexes'], count: 10 },
    { phase: 'Phase 2', label: 'Days 11–20', title: 'MongoDB & Integration', topics: ['Document modeling', 'CRUD & aggregation', 'Indexing & performance', 'Node.js integration'], count: 10 },
  ],
  'ai-first-webdev-49day': [
    { phase: 'Phase 1', label: 'Days 1–10', title: 'React Fundamentals', topics: ['Components & props', 'useState & useEffect', 'React Router', 'Forms & validation'], count: 10 },
    { phase: 'Phase 2', label: 'Days 11–20', title: 'Next.js & SSR', topics: ['Pages & App router', 'SSR & SSG', 'API routes', 'Metadata & SEO'], count: 10 },
    { phase: 'Phase 3', label: 'Days 21–28', title: 'Nuxt.js', topics: ['Vue 3 basics', 'Nuxt routing', 'Server routes', 'Deployment'], count: 8 },
    { phase: 'Phase 4', label: 'Days 29–42', title: 'AI Integration', topics: ['OpenAI & Claude APIs', 'Prompt engineering', 'Streaming responses', 'AI UI patterns'], count: 14 },
    { phase: 'Phase 5', label: 'Days 43–49', title: 'Testing & Deployment', topics: ['Playwright E2E', 'CI/CD pipelines', 'Production deploy', 'Capstone project'], count: 7 },
  ],
  'smart-ba-roadmap': [
    { phase: 'Module 1', label: 'Self-Paced', title: 'BA Fundamentals', topics: ['What BAs do', 'SDLC overview', 'Agile vs Waterfall', 'Stakeholder types'], count: null },
    { phase: 'Module 2', label: 'Self-Paced', title: 'Requirements Engineering', topics: ['Elicitation techniques', 'User stories', 'Acceptance criteria', 'Requirements docs'], count: null },
    { phase: 'Module 3', label: 'Self-Paced', title: 'Process Modeling', topics: ['BPMN diagrams', 'Flowcharts', 'Use case diagrams', 'Data flow diagrams'], count: null },
    { phase: 'Module 4', label: 'Self-Paced', title: 'Tools & Techniques', topics: ['JIRA & Confluence', 'Visio & Lucidchart', 'Wireframing basics', 'Estimation techniques'], count: null },
    { phase: 'Module 5', label: 'Self-Paced', title: 'Career Preparation', topics: ['Portfolio building', 'Interview prep', 'CBAP/ECBA overview', 'Job search strategy'], count: null },
  ],
}

// ── Course FAQs ─────────────────────────────────────────────────
const COURSE_FAQ = {
  'nodejs-30day': [
    { q: 'Do I need to know JavaScript before starting?', a: 'Yes — JavaScript ES6+ is required. This course starts from Node.js, not JavaScript basics. If you need to learn JS first, the Frontend Development Roadmap covers it.' },
    { q: 'Will I build a real project?', a: 'Yes. The course culminates in a production-ready REST API — a real backend project you can add to your portfolio and deploy to the cloud.' },
    { q: 'Is this good for frontend developers going fullstack?', a: "It's designed for exactly that. The course takes you from frontend-only JavaScript to writing full backend systems with Express, databases, and authentication." },
    { q: 'Does it cover deployment?', a: 'Yes — Phase 5 covers deploying your Node.js app to cloud platforms like Render or Railway, including environment configuration and production setup.' },
  ],
  'frontend-roadmap': [
    { q: 'Is this really for complete beginners?', a: 'Yes, absolutely. Day 1 starts with what HTML is and why it matters. No prior coding experience is required — this is your zero-to-one course.' },
    { q: 'Will I learn React in this course?', a: 'No — this course focuses on pure HTML, CSS, and vanilla JavaScript. React is covered in the AI-First Web Dev roadmap once you have strong fundamentals.' },
    { q: 'What will I build by the end?', a: "You'll build a fully responsive portfolio website with multiple pages, JavaScript interactions, and production-quality code you can share with employers." },
    { q: 'How is 2 hours per day calculated?', a: 'Each day combines reading (30 min), hands-on practice (60 min), and a small exercise (30 min). Some days are lighter, some heavier — but 2 hours is the consistent average.' },
  ],
  'sql-mongodb-20day': [
    { q: 'Do I need prior database experience?', a: 'No. The course starts from scratch — Day 1 explains what a database is and why you need one. Basic programming knowledge is enough to get started.' },
    { q: 'Which should I learn first, SQL or MongoDB?', a: 'The course teaches SQL first (Days 1–10), then MongoDB (Days 11–20), and explicitly covers when and why to choose one over the other for real projects.' },
    { q: 'Can I do this alongside the Node.js course?', a: 'Yes — it pairs perfectly with Node.js Mastery. Phase 3 of that course covers database integration, and this course gives you the deep database foundation to understand it fully.' },
    { q: 'Is this enough to get a backend or full-stack job?', a: 'Combined with the Node.js course, yes. Employers expect backend developers to know both SQL and NoSQL — this course gives you both in 20 days.' },
  ],
  'ai-first-webdev-49day': [
    { q: 'Do I need to know React before starting?', a: 'No prior React knowledge needed — Phase 1 teaches React from components and state to hooks and routing. You do need HTML, CSS, and JavaScript basics.' },
    { q: 'Will I work with real AI APIs like OpenAI?', a: 'Yes. Phase 4 covers integrating OpenAI and Claude APIs into real applications, including streaming responses, prompt engineering, and building AI-native UI patterns.' },
    { q: 'Why does it cover both Next.js and Nuxt?', a: 'The industry uses both. Next.js dominates React-based SSR, while Nuxt is the standard for Vue. Knowing both makes you significantly more employable.' },
    { q: 'Is Playwright testing actually covered?', a: 'Yes — Phase 5 dedicates full days to writing end-to-end tests with Playwright. This is a real industry skill that most bootcamps skip entirely.' },
  ],
  'smart-ba-roadmap': [
    { q: 'Is this for developers or non-technical people?', a: 'Both. Career changers with no technical background are welcome — Module 1 builds context from scratch. Developers transitioning to BA roles will move faster through the technical concepts.' },
    { q: 'Does this prepare me for BA certifications like CBAP or ECBA?', a: "Yes — Module 5 covers the core BABOK competencies that underpin CBAP and ECBA certification. The roadmap isn't a certification prep course, but it's a strong foundation for it." },
    { q: 'What tools will I actually learn to use?', a: "JIRA for issue tracking, Confluence for documentation, Visio/Lucidchart for process modeling, and wireframing basics. These are the tools you'll encounter in real BA roles." },
    { q: "How long will this take if it's self-paced?", a: "Most learners complete it in 6–10 weeks at 1–2 hours per day. There's no deadline — work at the pace that fits your schedule." },
  ],
}

// ── Platform features (shared) ──────────────────────────────────
const PLATFORM_FEATURES = [
  { icon: '🗺️', title: 'Day-by-Day Roadmap', desc: 'Know exactly what to do every single day. No guesswork, no decision fatigue.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Mark lessons complete and watch your progress bar grow with every session.' },
  { icon: '🏆', title: 'Certificate of Completion', desc: 'Finish the course and earn a shareable certificate for LinkedIn and your portfolio.' },
  { icon: '🆓', title: 'Free Forever', desc: 'All courses, all lessons, all certificates. Zero cost, no credit card, no catch.' },
]

export default function PublicCoursePage() {
  const { slug } = useParams()
  const { user, updateUser } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const shareRef = useRef(null)
  const [showShare, setShowShare] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [enrolling, setEnrolling] = useState(false)

  const course = COURSES.find(c => c.id === slug)

  // Close share dropdown on outside click
  const handleShareBlur = (e) => {
    if (shareRef.current && !shareRef.current.contains(e.relatedTarget)) {
      setShowShare(false)
    }
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 48 }}>
          <div style={{ fontSize: 56 }}>😕</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Course not found</h1>
          <p style={{ color: 'var(--text2)', margin: 0 }}>This course link may be invalid.</p>
          <Link to="/courses" className="btn btn-primary">Browse all courses →</Link>
        </main>
        <Footer />
      </>
    )
  }

  const enrolled = user && (user.enrolledCourses || []).includes(slug)
  const seo = COURSE_SEO[slug] || {}
  const benefits = COURSE_BENEFITS[slug] || []
  const whoFor = COURSE_WHO_ITS_FOR[slug] || []
  const curriculum = COURSE_CURRICULUM[slug] || []
  const faqs = COURSE_FAQ[slug] || []
  const schemaMeta = COURSE_SCHEMA_META[slug] || {}

  async function handleEnroll() {
    if (!user) {
      navigate(`/sign-up?next=/course/${slug}`)
      return
    }
    if (enrolled) {
      navigate(`/course/${slug}`)
      return
    }
    setEnrolling(true)
    try {
      const updated = await apiEnrollCourse(user.id, slug)
      updateUser(updated)
      showToast('Enrolled successfully!', 'success')
      navigate(`/course/${slug}`)
    } catch (err) {
      showToast(err.message || 'Enrollment failed', 'error')
    } finally {
      setEnrolling(false)
    }
  }

  const enrollLabel = enrolling ? 'Enrolling…' : enrolled ? 'Continue Learning →' : 'Enroll Now — Free →'

  return (
    <>
      <SEO
        title={course.title}
        description={seo.description || course.description}
        path={`/courses/${slug}`}
        image={`${SITE_URL}${COURSE_OG_IMAGES[slug] || '/assets/og/learnhub-og.png'}`}
        keywords={seo.keywords || `${course.title}, ${course.category}, free course, developer roadmap`}
        breadcrumb={[{ name: 'Courses', path: '/courses' }, { name: course.title, path: `/courses/${slug}` }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: course.title,
            description: seo.description || course.description,
            url: `${SITE_URL}/courses/${slug}`,
            provider: { '@type': 'Organization', name: 'LearnHub', url: SITE_URL },
            isAccessibleForFree: true,
            educationalLevel: course.level,
            about: course.category,
            timeRequired: course.duration,
            teaches: schemaMeta.teaches || [],
            coursePrerequisites: schemaMeta.coursePrerequisites || '',
            competencyRequired: schemaMeta.competencyRequired || '',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              courseWorkload: course.dailyEffort,
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/courses/${slug}`,
              seller: { '@type': 'Organization', name: 'LearnHub' },
            },
            image: `${SITE_URL}${COURSE_OG_IMAGES[slug] || '/assets/og/learnhub-og.png'}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      <Navbar />

      <main>

        {/* ── Hero ── */}
        <section
          className="pub-course-hero"
          style={{ background: `linear-gradient(135deg, ${course.color}14 0%, #ffffff 65%)`, borderBottom: '1px solid #e8eaed', padding: '56px 0 52px' }}
          aria-label={`${course.title} course overview`}
        >
          <div className="container">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: '#5f6368', marginBottom: 24, display: 'flex', gap: 6, alignItems: 'center' }}>
              <Link to="/" style={{ color: '#5f6368', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <Link to="/courses" style={{ color: '#5f6368', textDecoration: 'none' }}>Courses</Link>
              <span>›</span>
              <span style={{ color: '#202124' }}>{course.title}</span>
            </nav>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 48, alignItems: 'start' }}>
              <div>
                {/* Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                  <span className={`chip chip-${course.category === 'Backend Development' ? 'purple' : course.category === 'Frontend Development' ? 'blue' : course.category === 'Database Engineering' ? 'cyan' : course.category === 'Full-Stack + AI' ? 'amber' : 'green'}`}>
                    {course.category}
                  </span>
                  <span className="chip chip-dark">{course.level}</span>
                  <span className="chip chip-blue">{course.duration}</span>
                </div>

                <h1 style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#202124', marginBottom: 14, lineHeight: 1.15 }}>
                  {course.emoji} {course.title}
                </h1>
                <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#5f6368', lineHeight: 1.7, marginBottom: 32, maxWidth: 640 }}>
                  {course.description}
                </p>

                {/* Stat cards */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
                  {[
                    ['📅', course.duration, 'Duration'],
                    ['⏱️', course.dailyEffort, 'Daily Effort'],
                    ['🎯', course.prerequisites, 'Prerequisites'],
                    ['🏆', course.outcome, 'Outcome'],
                  ].filter(([, v]) => v).map(([icon, value, label]) => (
                    <div key={label} style={{ background: '#ffffff', border: '1px solid #e8eaed', borderRadius: 10, padding: '12px 20px', minWidth: 130, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#202124' }}>{value}</div>
                      <div style={{ fontSize: 10, color: '#9aa0a6', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: 2 }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: 16, padding: '14px 36px', borderRadius: 10 }}
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrollLabel}
                  </button>

                  {/* Share button */}
                  <div ref={shareRef} style={{ position: 'relative' }} onBlur={handleShareBlur}>
                    <button
                      onClick={() => setShowShare(s => !s)}
                      aria-expanded={showShare}
                      aria-haspopup="true"
                      style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', border: '1px solid #e8eaed', color: '#202124', padding: '13px 22px', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                      </svg>
                      Share Course
                    </button>

                    {showShare && (
                      <div role="menu" style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#ffffff', border: '1px solid #e8eaed', borderRadius: 12, padding: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200, minWidth: 230 }}>
                        <div style={{ padding: '8px 14px 6px', fontSize: 11, fontWeight: 700, color: '#9aa0a6', textTransform: 'uppercase', letterSpacing: '.07em' }}>Share this course</div>
                        {[
                          {
                            label: 'Copy Link', icon: '🔗',
                            action: () => {
                              navigator.clipboard?.writeText(`${SITE_URL}/courses/${slug}`)
                              showToast('Link copied!', 'success')
                              setShowShare(false)
                            },
                          },
                          {
                            label: 'Share on X / Twitter', icon: '𝕏',
                            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out "${course.title}" — a free structured learning roadmap on LearnHub!`)}&url=${encodeURIComponent(`${SITE_URL}/courses/${slug}`)}`,
                          },
                          {
                            label: 'Share on LinkedIn', icon: '💼',
                            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/courses/${slug}`)}`,
                          },
                          {
                            label: 'Share on WhatsApp', icon: '💬',
                            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out "${course.title}" — free on LearnHub! ${SITE_URL}/courses/${slug}`)}`,
                          },
                          {
                            label: 'Share on Facebook', icon: '📘',
                            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/courses/${slug}`)}`,
                          },
                        ].map(({ label, icon, action, href }) =>
                          action ? (
                            <button key={label} role="menuitem" onClick={action} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8, fontSize: 14, color: '#202124', fontFamily: 'inherit', textAlign: 'left' }}>
                              <span style={{ fontSize: 16 }}>{icon}</span>{label}
                            </button>
                          ) : (
                            <a key={label} role="menuitem" href={href} target="_blank" rel="noopener noreferrer" onClick={() => setShowShare(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderRadius: 8, fontSize: 14, color: '#202124', textDecoration: 'none', fontFamily: 'inherit' }}>
                              <span style={{ fontSize: 16 }}>{icon}</span>{label}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: 13, color: '#9aa0a6' }}>No credit card · Free forever</span>
                </div>
              </div>

              {/* Hero badge */}
              <div style={{ width: 220, flexShrink: 0, display: 'none' }} className="pub-course-hero__badge-col">
                <div style={{ background: course.color, borderRadius: 20, padding: 32, textAlign: 'center', color: '#ffffff', boxShadow: `0 12px 40px ${course.color}40` }}>
                  <div style={{ fontSize: 56, marginBottom: 12 }}>{course.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, marginBottom: 8 }}>{course.title}</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{course.duration} · {course.level}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust bar ── */}
        <section style={{ background: '#f8f9fa', borderBottom: '1px solid #e8eaed', padding: '14px 0' }} aria-label="Platform stats">
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'center' }}>
              {[
                ['5', 'Structured Courses'],
                ['200+', 'Day-by-Day Lessons'],
                ['100%', 'Free Forever'],
                ['✓', 'Certificate Included'],
              ].map(([num, label], i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 28px', borderRight: i < 3 ? '1px solid #e8eaed' : 'none' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: course.color }}>{num}</span>
                  <span style={{ fontSize: 13, color: '#5f6368' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What You'll Learn ── */}
        {benefits.length > 0 && (
          <section style={{ padding: '72px 0' }} aria-labelledby="learn-heading">
            <div className="container" style={{ maxWidth: 900 }}>
              <h2 id="learn-heading" style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 28, fontWeight: 700, color: '#202124', marginBottom: 8 }}>
                What you'll learn
              </h2>
              <p style={{ color: '#5f6368', fontSize: 16, marginBottom: 36 }}>
                Concrete, real-world skills you'll have by the end of this course.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                {benefits.map(benefit => (
                  <div key={benefit} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 18px', background: '#f8f9fa', border: '1px solid #e8eaed', borderRadius: 10 }}>
                    <span style={{ color: course.color, fontSize: 16, flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#202124', lineHeight: 1.55 }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Who it's for ── */}
        {whoFor.length > 0 && (
          <section style={{ padding: '72px 0', background: '#f8f9fa', borderTop: '1px solid #e8eaed', borderBottom: '1px solid #e8eaed' }} aria-labelledby="whofor-heading">
            <div className="container" style={{ maxWidth: 900 }}>
              <h2 id="whofor-heading" style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 28, fontWeight: 700, color: '#202124', marginBottom: 8 }}>
                Who this course is for
              </h2>
              <p style={{ color: '#5f6368', fontSize: 16, marginBottom: 36 }}>
                This roadmap is built for a specific learner — see if that's you.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {whoFor.map(persona => (
                  <div key={persona.title} style={{ background: '#ffffff', border: '1px solid #e8eaed', borderRadius: 12, padding: '24px 22px', display: 'flex', gap: 16, alignItems: 'flex-start', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{persona.icon}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginBottom: 4 }}>{persona.title}</div>
                      <div style={{ fontSize: 13, color: '#5f6368', lineHeight: 1.55 }}>{persona.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Curriculum ── */}
        {curriculum.length > 0 && (
          <section style={{ padding: '72px 0' }} aria-labelledby="curriculum-heading">
            <div className="container" style={{ maxWidth: 900 }}>
              <h2 id="curriculum-heading" style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 28, fontWeight: 700, color: '#202124', marginBottom: 8 }}>
                Course curriculum
              </h2>
              <p style={{ color: '#5f6368', fontSize: 16, marginBottom: 36 }}>
                {course.duration === 'Self-Paced' ? 'Self-paced modules you work through at your own speed.' : `${curriculum.reduce((acc, p) => acc + (p.count || 0), 0)} lessons across ${curriculum.length} structured phases.`}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {curriculum.map((phase, i) => (
                  <div key={phase.phase} style={{ border: '1px solid #e8eaed', borderRadius: 12, overflow: 'hidden', background: '#ffffff' }}>
                    <div style={{ background: `${course.color}0d`, borderBottom: `1px solid ${course.color}20`, padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                      <span style={{ background: course.color, color: '#fff', borderRadius: 100, padding: '3px 14px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{phase.phase}</span>
                      <span style={{ fontSize: 13, color: '#5f6368', flexShrink: 0 }}>{phase.label}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#202124', flex: 1 }}>{phase.title}</span>
                      {phase.count && <span style={{ fontSize: 12, color: '#9aa0a6', flexShrink: 0 }}>{phase.count} lessons</span>}
                    </div>
                    <div style={{ padding: '14px 22px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {phase.topics.map(topic => (
                        <span key={topic} className="chip chip-dark" style={{ fontSize: 12 }}>{topic}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Platform features ── */}
        <section style={{ padding: '72px 0', background: '#202124', borderTop: '1px solid #333' }} aria-labelledby="features-heading">
          <div className="container" style={{ maxWidth: 900 }}>
            <h2 id="features-heading" style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 28, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
              Everything you need to learn, for free
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 40 }}>
              LearnHub is built for developers who want structure, not subscriptions.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
              {PLATFORM_FEATURES.map(f => (
                <div key={f.title} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '22px 20px' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {faqs.length > 0 && (
          <section style={{ padding: '72px 0' }} aria-labelledby="faq-heading">
            <div className="container" style={{ maxWidth: 760 }}>
              <h2 id="faq-heading" style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 28, fontWeight: 700, color: '#202124', marginBottom: 8 }}>
                Frequently asked questions
              </h2>
              <p style={{ color: '#5f6368', fontSize: 16, marginBottom: 36 }}>
                Everything you need to decide if this course is right for you.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ border: '1px solid #e8eaed', borderRadius: 10, overflow: 'hidden', background: '#ffffff' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16, fontFamily: 'inherit' }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#202124', lineHeight: 1.4 }}>{faq.q}</span>
                      <span style={{ fontSize: 20, color: course.color, flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none', lineHeight: 1 }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: '0 22px 18px', fontSize: 14, color: '#5f6368', lineHeight: 1.7, borderTop: '1px solid #f1f3f4' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section
          style={{ background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}cc 100%)`, padding: '80px 0', textAlign: 'center' }}
          aria-label="Enroll call to action"
        >
          <div className="container" style={{ maxWidth: 600 }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>{course.emoji}</div>
            <h2 style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#ffffff', marginBottom: 14 }}>
              Ready to start learning?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
              Join thousands of learners mastering {course.category.toLowerCase()} with a structured, day-by-day roadmap. Free, self-paced, and certificate-ready.
            </p>
            <button
              className="btn"
              style={{ background: '#ffffff', color: course.color, fontSize: 17, padding: '15px 44px', borderRadius: 12, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
              onClick={handleEnroll}
              disabled={enrolling}
            >
              {enrolling ? 'Enrolling…' : enrolled ? 'Open My Course →' : 'Get Started Free →'}
            </button>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 16 }}>
              No account required to browse · Sign up in 30 seconds · No credit card
            </p>
          </div>
        </section>

        {/* ── Related courses ── */}
        <section style={{ padding: '72px 0', background: '#f8f9fa', borderTop: '1px solid #e8eaed' }} aria-labelledby="related-heading">
          <div className="container" style={{ maxWidth: 960 }}>
            <h2 id="related-heading" style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 22, fontWeight: 700, color: '#202124', marginBottom: 24 }}>
              Explore other courses
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {COURSES.filter(c => c.id !== slug).map(c => (
                <Link
                  key={c.id}
                  to={`/courses/${c.id}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ffffff', border: `1px solid ${c.color}30`, borderLeft: `3px solid ${c.color}`, borderRadius: 10, padding: '12px 18px', textDecoration: 'none', flex: '1 1 200px', minWidth: 200, maxWidth: 340, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
                >
                  <span style={{ fontSize: 22 }}>{c.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#202124', lineHeight: 1.3 }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: '#9aa0a6', marginTop: 2 }}>{c.duration} · {c.level}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
