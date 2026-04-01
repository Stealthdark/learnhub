/* ══════════════════════════════════════════════════════
   API CLIENT — fetch() wrappers for the LearnHub backend
   Token stored in sessionStorage under 'lh_token'.
══════════════════════════════════════════════════════ */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function getToken() {
  return sessionStorage.getItem('lh_token')
}

async function apiFetch(path, options = {}) {
  const { silent = false, ...fetchOptions } = options
  if (!silent) window.dispatchEvent(new CustomEvent('lh:fetch:start'))
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...(fetchOptions.headers || {}) }
  if (token) headers['Authorization'] = `Bearer ${token}`
  try {
    const res = await fetch(`${API_BASE}${path}`, { ...fetchOptions, headers })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      const err = new Error(body.error || `HTTP ${res.status}`)
      err.status = res.status
      throw err
    }
    return res.json()
  } finally {
    if (!silent) window.dispatchEvent(new CustomEvent('lh:fetch:end'))
  }
}

/* ── Auth ─────────────────────────────────────────── */
export async function apiSignup(name, email, password) {
  return apiFetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) })
}
export async function apiVerifyEmail(email, code) {
  return apiFetch('/api/auth/verify-email', { method: 'POST', body: JSON.stringify({ email, code }) })
}
export async function apiResendOtp(email) {
  return apiFetch('/api/auth/resend-otp', { method: 'POST', body: JSON.stringify({ email }) })
}
export async function apiLogin(email, password) {
  return apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}
export async function apiGetCurrentUser() {
  if (!getToken()) return null
  try {
    return await apiFetch('/api/auth/me')
  } catch (err) {
    if (err.status === 401) { sessionStorage.removeItem('lh_token'); return null }
    throw err
  }
}

/* ── Users ────────────────────────────────────────── */
export async function apiGetUsers() { return apiFetch('/api/users') }
export async function apiGetUser(id) { return apiFetch(`/api/users/${id}`) }
export async function apiUpdateUser(id, fields) {
  return apiFetch(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify(fields) })
}
export async function apiChangePassword(id, currentPassword, newPassword) {
  return apiFetch(`/api/users/${id}/password`, { method: 'PATCH', body: JSON.stringify({ currentPassword, newPassword }) })
}
export async function apiEnrollCourse(userId, courseId) {
  return apiFetch(`/api/users/${userId}/enroll`, { method: 'POST', body: JSON.stringify({ courseId }) })
}
export async function apiDeleteUser(id) { return apiFetch(`/api/users/${id}`, { method: 'DELETE' }) }

/* ── Courses ──────────────────────────────────────── */
export async function apiGetCourses() { return apiFetch('/api/courses') }
export async function apiGetCourse(id) { return apiFetch(`/api/courses/${id}`) }
export async function apiSetCourse(course) {
  if (course.id) return apiFetch(`/api/courses/${course.id}`, { method: 'PUT', body: JSON.stringify(course) })
  return apiFetch('/api/courses', { method: 'POST', body: JSON.stringify(course) })
}
export async function apiDeleteCourse(id) { return apiFetch(`/api/courses/${id}`, { method: 'DELETE' }) }

/* ── Progress ─────────────────────────────────────── */
export async function apiGetProgress(userId, courseId) {
  try {
    return await apiFetch(`/api/progress/${userId}/${courseId}`)
  } catch (err) {
    if (err.status === 404) return { completed: [], lastUpdated: null }
    throw err
  }
}
export async function apiSaveProgress(userId, courseId, data) {
  return apiFetch(`/api/progress/${userId}/${courseId}`, { method: 'PUT', body: JSON.stringify(data), silent: true })
}
export async function apiBatchProgress(userId) { return apiFetch(`/api/progress/${userId}`, { silent: true }) }

/* ── Auth helpers ─────────────────────────────────── */
export function loginUser(token) { sessionStorage.setItem('lh_token', token) }
export function logoutUser() { sessionStorage.removeItem('lh_token') }
export function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8) }
