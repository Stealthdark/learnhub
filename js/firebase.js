/* ═══════════════════════════════════════════════════════
   FIREBASE — CONFIG & FIRESTORE HELPERS
   Replace FIREBASE_CONFIG values with your project's config:
   Firebase Console → Project Settings → Your Apps → Web App
═══════════════════════════════════════════════════════ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBhjou5IzfMDCJlBHWOjp5fwtLfl3uR8Uk",
  authDomain: "learnhub-prod.firebaseapp.com",
  projectId: "learnhub-prod",
  storageBucket: "learnhub-prod.firebasestorage.app",
  messagingSenderId: "981690052843",
  appId: "1:981690052843:web:8b8e0873f60327107f8eae",
  measurementId: "G-6PN4KZDEZV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
const db = firebase.firestore();

/* ── Users ─────────────────────────────────────────────── */
async function fbGetUsers() {
  const snap = await db.collection("users").get();
  return snap.docs.map((d) => d.data());
}
async function fbGetUser(id) {
  const doc = await db.collection("users").doc(id).get();
  return doc.exists ? doc.data() : null;
}
async function fbGetUserByEmail(email) {
  const snap = await db
    .collection("users")
    .where("email", "==", email.toLowerCase())
    .get();
  return snap.empty ? null : snap.docs[0].data();
}
async function fbSetUser(user) {
  await db.collection("users").doc(user.id).set(user);
}
async function fbDeleteUser(id) {
  await db.collection("users").doc(id).delete();
}

/* ── Courses ───────────────────────────────────────────── */
async function fbGetCourses() {
  const snap = await db.collection("courses").get();
  return snap.docs.map((d) => d.data());
}
async function fbSetCourse(course) {
  await db.collection("courses").doc(course.id).set(course);
}
async function fbDeleteCourse(id) {
  await db.collection("courses").doc(id).delete();
}

/* ── Progress ──────────────────────────────────────────── */
async function fbGetProgress(userId, courseId) {
  const doc = await db
    .collection("progress")
    .doc(`${userId}_${courseId}`)
    .get();
  return doc.exists ? doc.data() : { completed: [], lastUpdated: null };
}
async function fbSaveProgress(userId, courseId, data) {
  await db
    .collection("progress")
    .doc(`${userId}_${courseId}`)
    .set({
      ...data,
      lastUpdated: new Date().toISOString(),
    });
}

/* ── Admin Initialization ──────────────────────────────── */
async function initFirestoreAdmin() {
  const BUNDLED = [
    NODEJS_30DAY_COURSE,
    FRONTEND_ROADMAP_COURSE,
    SQL_MONGODB_20DAY_COURSE,
    AI_FIRST_WEBDEV_COURSE,
    SMART_BA_ROADMAP_COURSE,
  ];

  // Always sync bundled courses so latest content is in Firestore
  const batch = db.batch();
  BUNDLED.forEach((c) => batch.set(db.collection("courses").doc(c.id), c));
  await batch.commit();

  // One-time: seed default admin + migrate existing localStorage users
  if (!localStorage.getItem("lh_fb_users_init")) {
    const snap = await db.collection("users").get();
    if (snap.empty) {
      await fbSetUser({
        id: "admin",
        email: "admin@learnhub.dev",
        name: "Admin",
        password: "Admin@123",
        role: "admin",
        verified: true,
        avatar: "",
        bio: "Platform administrator",
        joinedAt: new Date().toISOString(),
        enrolledCourses: [],
      });
    } else {
      // Migrate any localStorage users not yet in Firestore
      try {
        const lsUsers = JSON.parse(localStorage.getItem("lh_users") || "[]");
        const existingIds = new Set(snap.docs.map((d) => d.id));
        const toMigrate = lsUsers.filter((u) => !existingIds.has(u.id));
        if (toMigrate.length) {
          const migBatch = db.batch();
          toMigrate.forEach((u) =>
            migBatch.set(db.collection("users").doc(u.id), u),
          );
          await migBatch.commit();
        }
      } catch (e) {
        console.warn("localStorage migration error:", e);
      }
    }
    localStorage.setItem("lh_fb_users_init", "1");
  }
}
