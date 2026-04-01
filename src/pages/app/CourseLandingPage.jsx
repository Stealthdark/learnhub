import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { apiGetCourses, apiEnrollCourse } from '../../utils/api'

const SITE_URL = 'https://learnhubdev.com'

const COURSE_OG_IMAGES = {
  'nodejs-30day':          '/assets/og/nodejs-og.png',
  'frontend-roadmap':      '/assets/og/frontend-og.png',
  'sql-mongodb-20day':     '/assets/og/sql-mongodb-og.png',
  'ai-first-webdev-49day': '/assets/og/ai-first-webdev-og.png',
  'smart-ba-roadmap':      '/assets/og/smart-ba-og.png',
}

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

export default function CourseLandingPage() {
  const { courseId } = useParams()
  const { user, updateUser } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const imgSrc = img => img && (img.startsWith('/') || img.startsWith('http') ? img : '/' + img)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showShare, setShowShare] = useState(false)
  const shareRef = useRef(null)

  useEffect(() => {
    apiGetCourses().then(courses => {
      setCourse(courses.find(c => c.id === courseId) || null)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [courseId])

  useEffect(() => {
    if (!showShare) return
    function handleOutsideClick(e) {
      if (shareRef.current && !shareRef.current.contains(e.target)) setShowShare(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [showShare])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <span className="spinner" style={{ width: 32, height: 32 }} />
    </div>
  )

  if (!course) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', flexDirection: 'column', gap: 16, padding: 24 }}>
      <div style={{ fontSize: 56 }}>😕</div>
      <h1 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Course not found</h1>
      <p style={{ color: 'var(--text2)', fontSize: 14, margin: 0 }}>This course link may be invalid.</p>
      <Link to="/courses" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>← Browse all courses</Link>
    </div>
  )

  const enrolled = user && (user.enrolledCourses || []).includes(courseId)
  const accentColor = course.weeks?.[0]?.color || '#1a73e8'
  const defaultColors = ['#7c4dff', '#007b83', '#137333', '#e37400', '#1a73e8', '#c5221f']

  async function handleEnrollClick() {
    if (!user) {
      navigate(`/sign-up?next=/course/${courseId}`)
      return
    }
    if (enrolled) {
      navigate(`/course/${courseId}`)
      return
    }
    try {
      const updated = await apiEnrollCourse(user.id, courseId)
      updateUser(updated)
      showToast('Enrolled successfully!', 'success')
      navigate(`/course/${courseId}`)
    } catch (err) {
      showToast(err.message || 'Enrollment failed', 'error')
    }
  }

  return (
    <>
      <SEO
        title={course.title}
        description={`${course.description?.slice(0, 150)} Free ${course.duration} structured roadmap on LearnHub.`}
        path={`/courses/${courseId}`}
        image={`${SITE_URL}${COURSE_OG_IMAGES[courseId] || '/assets/og/learnhub-og.png'}`}
        keywords={`${course.title}, ${course.category}, free course, developer roadmap, ${course.level}`}
        breadcrumb={[{ name: 'Courses', path: '/courses' }, { name: course.title, path: `/courses/${courseId}` }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: course.title,
          description: course.description,
          url: `${SITE_URL}/course/${courseId}`,
          provider: { '@type': 'Organization', name: 'LearnHub', url: SITE_URL },
          isAccessibleForFree: true,
          educationalLevel: course.level,
          about: course.category,
          timeRequired: course.duration,
          teaches: COURSE_SCHEMA_META[courseId]?.teaches || [],
          coursePrerequisites: COURSE_SCHEMA_META[courseId]?.coursePrerequisites || '',
          competencyRequired: COURSE_SCHEMA_META[courseId]?.competencyRequired || '',
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
            url: `${SITE_URL}/course/${courseId}`,
            seller: { '@type': 'Organization', name: 'LearnHub' },
          },
          image: `${SITE_URL}${COURSE_OG_IMAGES[courseId] || '/assets/og/learnhub-og.png'}`,
        }}
      />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Roboto',sans-serif" }}>

        {/* Sticky Nav */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <img src="/assets/og/logo/learnhub-logo.png" alt="LearnHub" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
            <span style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 17, fontWeight: 700, color: 'var(--primary)' }}>LearnHub</span>
          </Link>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {user ? (
              <button className="btn btn-primary btn-sm" onClick={handleEnrollClick}>
                {enrolled ? 'Continue Learning →' : 'Enroll Free →'}
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
                <button className="btn btn-primary btn-sm" onClick={handleEnrollClick}>Enroll Free</button>
              </>
            )}
          </div>
        </nav>

        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg, ${accentColor}18 0%, var(--bg) 60%)`, borderBottom: '1px solid var(--border)', padding: '56px 24px 48px' }}>
          <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 420px', minWidth: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                <span className="chip chip-blue">{course.category}</span>
                <span className="chip chip-purple">{course.level}</span>
                {course.weeks && <span style={{ background: accentColor + '20', color: accentColor, border: `1px solid ${accentColor}40`, padding: '2px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{course.weeks.length} Phases</span>}
              </div>
              <h1 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.15 }}>{course.title}</h1>
              <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: 'var(--text2)', lineHeight: 1.7, marginBottom: 32, maxWidth: 600 }}>{course.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
                {[['📅', course.duration, 'Duration'], ['⏱', course.dailyEffort, 'Daily Effort'], ['🎯', course.prerequisites, 'Prerequisites'], ['🏆', course.outcome, 'Outcome']].filter(([, v]) => v).map(([icon, value, label]) => (
                  <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 18px', minWidth: 130 }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{value}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <button className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px', borderRadius: 10 }} onClick={handleEnrollClick}>
                  {user && enrolled ? 'Continue Learning →' : user ? 'Start Course — Free →' : 'Enroll Now — Free →'}
                </button>

                {/* Share Button */}
                <div ref={shareRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowShare(s => !s)}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', padding: '13px 20px', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    Share
                  </button>
                  {showShare && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.14)', zIndex: 200, minWidth: 220 }}>
                      <div style={{ padding: '8px 12px 6px', fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Share this course</div>
                      {[
                        { label: 'Copy Link', icon: '🔗', action: () => { navigator.clipboard?.writeText(`${SITE_URL}/courses/${courseId}`); showToast('Link copied!', 'success'); setShowShare(false) } },
                        { label: 'Share on X / Twitter', icon: '𝕏', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out "${course.title}" — a free structured learning roadmap on LearnHub!`)}&url=${encodeURIComponent(`${SITE_URL}/courses/${courseId}`)}` },
                        { label: 'Share on LinkedIn', icon: '💼', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/courses/${courseId}`)}` },
                        { label: 'Share on Facebook', icon: '📘', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/courses/${courseId}`)}` },
                        { label: 'Share on WhatsApp', icon: '💬', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out "${course.title}" — free on LearnHub! ${SITE_URL}/courses/${courseId}`)}` },
                      ].map(({ label, icon, action, href }) =>
                        action ? (
                          <button key={label} onClick={action} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8, fontSize: 13, color: 'var(--text)', fontFamily: "'Roboto',sans-serif", textAlign: 'left' }}>
                            <span style={{ fontSize: 15 }}>{icon}</span>{label}
                          </button>
                        ) : (
                          <a key={label} href={href} target="_blank" rel="noopener noreferrer" onClick={() => setShowShare(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontFamily: "'Roboto',sans-serif" }}>
                            <span style={{ fontSize: 15 }}>{icon}</span>{label}
                          </a>
                        )
                      )}
                    </div>
                  )}
                </div>

                <span style={{ fontSize: 13, color: 'var(--text3)' }}>No credit card required · Free forever</span>
              </div>
            </div>
            <div style={{ flex: '0 0 auto', width: 'clamp(240px,35%,330px)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid var(--border)', alignSelf: 'center' }}>
              {course.image ? (
                <img src={imgSrc(course.image)} alt={course.title} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: 330, background: `linear-gradient(135deg,${accentColor} 0%,${accentColor}88 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 48, opacity: .5 }}>📚</span>
                </div>
              )}
              <div style={{ background: 'var(--surface)', padding: '14px 18px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{course.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{course.duration} · {course.level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        {COURSE_BENEFITS[courseId] && (
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '52px 24px 0' }}>
            <h2 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>What You'll Learn</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
              {COURSE_BENEFITS[courseId].map(benefit => (
                <div key={benefit} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '13px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                  <span style={{ color: accentColor, fontSize: 15, flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55 }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Curriculum Preview */}
        {course.weeks?.length > 0 && (
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
            <h2 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Course Curriculum</h2>
            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 32 }}>{course.days?.length || 0} lessons across {course.weeks.length} phase{course.weeks.length !== 1 ? 's' : ''}</p>
            {course.weeks.map((week, wi) => {
              const color = week.color || defaultColors[wi % defaultColors.length]
              const weekDays = (week.days || []).map(id => course.days?.find(d => d.id === id)).filter(Boolean)
              return (
                <div key={week.id} style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: color + '15', borderBottom: `1px solid ${color}30`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ background: color + '25', color, border: `1px solid ${color}40`, padding: '3px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{week.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{week.title}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text3)', fontFamily: "'Roboto Mono',monospace" }}>{weekDays.length} days</span>
                  </div>
                  <div style={{ padding: '4px 0' }}>
                    {weekDays.slice(0, 5).map((day, di) => (
                      <div key={day.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 20px', borderBottom: di < Math.min(4, weekDays.length - 1) ? '1px solid var(--border)' : 'none' }}>
                        <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: 10, color: 'var(--text3)', marginTop: 3, flexShrink: 0, minWidth: 28 }}>D{String(day.id).padStart(2, '0')}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{day.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 1 }}>{day.subtitle}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flexShrink: 0 }}>
                          {(day.tags || []).slice(0, 2).map(t => <span key={t} className="chip chip-blue" style={{ fontSize: 10 }}>{t}</span>)}
                        </div>
                      </div>
                    ))}
                    {weekDays.length > 5 && (
                      <div style={{ padding: '10px 20px', fontSize: 12, color: 'var(--text3)' }}>+ {weekDays.length - 5} more lessons in this phase</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{ background: `linear-gradient(135deg, ${accentColor}12 0%, var(--bg) 100%)`, borderTop: '1px solid var(--border)', padding: '56px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Ready to start learning?</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>Join thousands of learners mastering {course.title.toLowerCase()}. Free, structured, and self-paced.</p>
          <button className="btn btn-primary" style={{ fontSize: 16, padding: '14px 40px', borderRadius: 10 }} onClick={handleEnrollClick}>
            {user && enrolled ? 'Open My Course →' : user ? 'Enroll Now — Free →' : 'Get Started Free →'}
          </button>
          <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text3)' }}>No account required to browse · Sign up in 30 seconds</div>
        </div>
      </div>
    </>
  )
}
