const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // .env stores \n as literal backslash-n; replace with real newlines
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

/* ── Users ──────────────────────────────────────────────── */
async function getUsers() {
  const snap = await db.collection('users').get();
  return snap.docs.map(d => d.data());
}
async function getUserById(id) {
  const doc = await db.collection('users').doc(id).get();
  return doc.exists ? doc.data() : null;
}
async function getUserByEmail(email) {
  const snap = await db.collection('users')
    .where('email', '==', email.toLowerCase())
    .get();
  return snap.empty ? null : snap.docs[0].data();
}
async function setUser(user) {
  await db.collection('users').doc(user.id).set(user);
}
async function deleteUser(id) {
  await db.collection('users').doc(id).delete();
}

/* ── Courses ────────────────────────────────────────────── */
async function getCourses() {
  const snap = await db.collection('courses').get();
  return snap.docs.map(d => d.data());
}
async function getCourseById(id) {
  const doc = await db.collection('courses').doc(id).get();
  return doc.exists ? doc.data() : null;
}
async function setCourse(course) {
  await db.collection('courses').doc(course.id).set(course);
}
async function deleteCourse(id) {
  await db.collection('courses').doc(id).delete();
}

/* ── Progress ───────────────────────────────────────────── */
async function getProgress(userId, courseId) {
  const doc = await db.collection('progress').doc(`${userId}_${courseId}`).get();
  return doc.exists ? doc.data() : { completed: [], lastUpdated: null };
}
async function saveProgress(userId, courseId, data) {
  await db.collection('progress').doc(`${userId}_${courseId}`).set({
    userId,
    courseId,
    ...data,
    lastUpdated: new Date().toISOString(),
  });
}
async function getUserAllProgress(userId) {
  const snap = await db.collection('progress').where('userId', '==', userId).get();
  return snap.docs.map(d => d.data());
}

/* ── OTPs (stores pending signup data alongside the code) ── */
async function saveOtp(email, code, extraData = {}) {
  await db.collection('otps').doc(email.toLowerCase()).set({
    code,
    email: email.toLowerCase(),
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    ...extraData,
  });
}
async function getOtp(email) {
  const doc = await db.collection('otps').doc(email.toLowerCase()).get();
  return doc.exists ? doc.data() : null;
}
async function deleteOtp(email) {
  await db.collection('otps').doc(email.toLowerCase()).delete();
}

module.exports = {
  getUsers, getUserById, getUserByEmail, setUser, deleteUser,
  getCourses, getCourseById, setCourse, deleteCourse,
  getProgress, saveProgress, getUserAllProgress,
  saveOtp, getOtp, deleteOtp,
};
