import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth, AuthProvider } from './hooks/useAuth'
import { ToastProvider } from './hooks/useToast'
import { LoadingProvider } from './contexts/LoadingContext'
import GlobalLoader from './components/shared/GlobalLoader'

import HomePage from './pages/HomePage'
import CoursesPublicPage from './pages/CoursesPublicPage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import RoadmapsPage from './pages/RoadmapsPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

import PublicCoursePage from './pages/PublicCoursePage'
import DashboardPage from './pages/app/DashboardPage'
import MyCoursesPage from './pages/app/MyCoursesPage'
import CourseViewPage from './pages/app/CourseViewPage'
import ProfilePage from './pages/app/ProfilePage'
import OnboardingPage from './pages/app/OnboardingPage'
import AdminCoursesPage from './pages/app/admin/AdminCoursesPage'
import AdminUsersPage from './pages/app/admin/AdminUsersPage'
import AdminEmailPage from './pages/app/admin/AdminEmailPage'

import AppLayout from './components/app/AppLayout'
import NotFoundPage from './pages/NotFoundPage'

function ProtectedRoute({ children }) {
  const { user, authChecked } = useAuth()
  const location = useLocation()

  if (!authChecked) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <span className="spinner" style={{ width: 32, height: 32 }} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}

function AdminRoute({ children }) {
  const { user } = useAuth()

  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <ToastProvider>
            <GlobalLoader />
            <Routes>
            {/* Public marketing routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPublicPage />} />
            <Route path="/courses/:slug" element={<PublicCoursePage />} />
            <Route path="/roadmaps" element={<RoadmapsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            {/* Protected app routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout><DashboardPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/my-courses" element={
              <ProtectedRoute>
                <AppLayout><MyCoursesPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/course/:courseId" element={
              <ProtectedRoute>
                <AppLayout><CourseViewPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <AppLayout><ProfilePage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/onboarding" element={
              <ProtectedRoute><OnboardingPage /></ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin/courses" element={
              <AdminRoute>
                <AppLayout><AdminCoursesPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AppLayout><AdminUsersPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/email" element={
              <AdminRoute>
                <AppLayout><AdminEmailPage /></AppLayout>
              </AdminRoute>
            } />

            {/* Legacy redirect */}
            <Route path="/app" element={<Navigate to="/dashboard" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  )
}
