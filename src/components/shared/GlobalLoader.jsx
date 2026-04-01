import { useEffect, useState } from 'react'
import { useGlobalLoading } from '../../contexts/LoadingContext'

export default function GlobalLoader() {
  const loading = useGlobalLoading()
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (loading) {
      setExiting(false)
      setVisible(true)
    } else if (visible) {
      setExiting(true)
      const t = setTimeout(() => {
        setVisible(false)
        setExiting(false)
      }, 250)
      return () => clearTimeout(t)
    }
  }, [loading])

  if (!visible) return null

  return (
    <div className={`gl-overlay${exiting ? ' gl-overlay-exit' : ''}`}>
      <div className="gl-card">
        <div className="gl-ring" />
        <span className="gl-label">Loading</span>
      </div>
    </div>
  )
}
