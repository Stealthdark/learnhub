import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'
import { Icon } from '../../components/shared/Icon'
import { useAuth } from '../../hooks/useAuth'
import { apiGetCourses, apiGetProgress } from '../../utils/api'

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState([])
  const enrolled = user?.enrolledCourses || []

  useEffect(() => {
    if (!enrolled.length) { setStats([]); return }
    apiGetCourses().then(async courses => {
      const computed = await Promise.all(enrolled.map(async cid => {
        const course = courses.find(c => c.id === cid)
        if (!course) return null
        const prog = await apiGetProgress(user.id, cid)
        const pct = Math.round((prog.completed.length / (course.days?.length || 1)) * 100)
        return { course, pct, completed: prog.completed.length, total: course.days?.length || 0 }
      }))
      setStats(computed.filter(Boolean))
    })
  }, [user?.id, enrolled.join(',')])

  const totalDays = stats.reduce((a, s) => a + s.total, 0)
  const doneDays = stats.reduce((a, s) => a + s.completed, 0)

  return (
    <>
      <SEO title="Dashboard" description="Your LearnHub learning dashboard." path="/dashboard" noindex />

      <div className="page-pad" style={{ maxWidth: 1100 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 className="h1" style={{ marginBottom: 4 }}>Welcome back, {user?.name.split(' ')[0]} 👋</h1>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>Track your learning progress and continue where you left off.</p>
        </div>

        {/* Stats */}
        <div className="grid-stats" style={{ marginBottom: 24 }}>
          {[
            { label: 'Enrolled Courses', value: enrolled.length, icon: <Icon.Book />, color: 'var(--primary)' },
            { label: 'Lessons Completed', value: doneDays, icon: <Icon.Check />, color: 'var(--green)' },
            { label: 'Overall Progress', value: totalDays > 0 ? Math.round((doneDays / totalDays) * 100) + '%' : '0%', icon: <Icon.BarChart />, color: 'var(--amber)' },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', fontFamily: "'Google Sans',sans-serif", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Courses */}
        <h2 style={{ fontFamily: "'Google Sans',sans-serif", fontSize: 17, fontWeight: 500, marginBottom: 14 }}>
          {enrolled.length ? 'Active Courses' : 'Explore Courses'}
        </h2>
        {stats.length === 0 ? (
          <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📚</div>
            <p style={{ color: 'var(--text2)', marginBottom: 16, fontSize: 14 }}>You haven't enrolled in any courses yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/my-courses')}>Browse Courses</button>
          </div>
        ) : (
          <div className="grid-courses">
            {stats.map(s => (
              <div key={s.course.id} className="card" style={{ padding: 20, cursor: 'pointer' }} onClick={() => navigate('/course/' + s.course.id)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, gap: 8 }}>
                  <span className="chip chip-blue" style={{ fontSize: 11 }}>{s.course.category}</span>
                  <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: "'Roboto Mono',monospace", flexShrink: 0 }}>{s.pct}%</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4, lineHeight: 1.4 }}>{s.course.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 14, lineHeight: 1.5 }}>{s.course.subtitle}</p>
                <div className="progress-bar-track" style={{ marginBottom: 6 }}>
                  <div className="progress-bar-fill" style={{ width: s.pct + '%' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)' }}>
                  <span>{s.completed}/{s.total} days</span>
                  <span>{s.pct === 100 ? '🎉 Completed!' : 'In progress'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
