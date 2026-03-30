/* ═══════════════════════════════════════════════════════
   API CLIENT — fetch() wrappers for the LearnHub backend
   Token is stored in sessionStorage under 'lh_token'.
   All authenticated requests send: Authorization: Bearer <token>
═══════════════════════════════════════════════════════ */

const API_BASE = window.LEARNHUB_API_URL || 'http://localhost:3001';

function getToken() {
  return sessionStorage.getItem('lh_token');
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/* ── Auth ───────────────────────────────────────────────── */
async function apiSignup(name, email, password) {
  return apiFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}
async function apiVerifyEmail(email, code) {
  return apiFetch('/api/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
}
async function apiResendOtp(email) {
  return apiFetch('/api/auth/resend-otp', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
async function apiLogin(email, password) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
async function apiGetCurrentUser() {
  if (!getToken()) return null;
  try {
    return await apiFetch('/api/auth/me');
  } catch (err) {
    if (err.status === 401) { sessionStorage.removeItem('lh_token'); return null; }
    throw err;
  }
}

/* ── Users ──────────────────────────────────────────────── */
async function apiGetUsers() {
  return apiFetch('/api/users');
}
async function apiGetUser(id) {
  return apiFetch(`/api/users/${id}`);
}
async function apiUpdateUser(id, fields) {
  return apiFetch(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(fields),
  });
}
async function apiChangePassword(id, currentPassword, newPassword) {
  return apiFetch(`/api/users/${id}/password`, {
    method: 'PATCH',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}
async function apiEnrollCourse(userId, courseId) {
  return apiFetch(`/api/users/${userId}/enroll`, {
    method: 'POST',
    body: JSON.stringify({ courseId }),
  });
}
async function apiDeleteUser(id) {
  return apiFetch(`/api/users/${id}`, { method: 'DELETE' });
}

/* ── Courses ────────────────────────────────────────────── */
async function apiGetCourses() {
  return apiFetch('/api/courses');
}
async function apiGetCourse(id) {
  return apiFetch(`/api/courses/${id}`);
}
async function apiSetCourse(course) {
  if (course.id) {
    return apiFetch(`/api/courses/${course.id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    });
  }
  return apiFetch('/api/courses', {
    method: 'POST',
    body: JSON.stringify(course),
  });
}
async function apiDeleteCourse(id) {
  return apiFetch(`/api/courses/${id}`, { method: 'DELETE' });
}

/* ── Progress ───────────────────────────────────────────── */
async function apiGetProgress(userId, courseId) {
  try {
    return await apiFetch(`/api/progress/${userId}/${courseId}`);
  } catch (err) {
    if (err.status === 404) return { completed: [], lastUpdated: null };
    throw err;
  }
}
async function apiSaveProgress(userId, courseId, data) {
  return apiFetch(`/api/progress/${userId}/${courseId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
async function apiBatchProgress(userId) {
  return apiFetch(`/api/progress/${userId}`);
}
