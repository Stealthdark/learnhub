/* ═══════════════════════════════════════════════════════
   REACT HOOKS — destructure once, available globally
═══════════════════════════════════════════════════════ */
const {useState,useEffect,useCallback,useRef,useMemo}=React;

/* ═══════════════════════════════════════════════════════
   EMAILJS — DYNAMIC CONFIG (stored in localStorage)
   Keys are entered via Admin → Email Settings panel.
   No code editing required.
═══════════════════════════════════════════════════════ */
const EMAILJS_STORE_KEY = "lh_emailjs_config";

function getEmailJSConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(EMAILJS_STORE_KEY) || "{}");
    return {
      serviceId:  saved.serviceId  || "service_00bfdtx",
      templateId: saved.templateId || "template_hhjc24d",
      publicKey:  saved.publicKey  || "yAdNYM8PucBh6xdeN",
    };
  } catch { return { serviceId:"service_00bfdtx", templateId:"template_hhjc24d", publicKey:"yAdNYM8PucBh6xdeN" }; }
}

function saveEmailJSConfig(cfg) {
  localStorage.setItem(EMAILJS_STORE_KEY, JSON.stringify(cfg));
  if (cfg.publicKey && typeof emailjs !== 'undefined') {
    try { emailjs.init({ publicKey: cfg.publicKey }); } catch(e) { console.warn("EmailJS init:", e); }
  }
}

function isEmailJSReady() {
  if (typeof emailjs === 'undefined') return false;
  const c = getEmailJSConfig();
  return !!(c.serviceId && c.templateId && c.publicKey);
}

// Boot-time init — pick up keys if already saved from a previous session
(function bootEmailJS() {
  if (typeof emailjs === 'undefined') return;
  const c = getEmailJSConfig();
  if (c.publicKey) {
    try { emailjs.init({ publicKey: c.publicKey }); } catch(e) { console.warn("EmailJS boot init:", e); }
  }
})();

/**
 * sendVerificationEmail
 * Sends the OTP email via EmailJS when keys are configured,
 * otherwise falls back to showing the code in the UI (dev mode).
 * @returns {Promise<{sent:boolean, code:string, fallback:boolean, error?:string}>}
 */
async function sendVerificationEmail(toEmail, toName, code) {
  if (!isEmailJSReady() || typeof emailjs === 'undefined') {
    return { sent: false, code, fallback: true };
  }
  const cfg = getEmailJSConfig();
  try {
    const response = await emailjs.send(
      cfg.serviceId,
      cfg.templateId,
      {
        to_name:  toName,
        to_email: toEmail,
        otp_code: code,
        app_name: "LearnHub",
      }
    );
    if (response.status === 200) {
      return { sent: true, code, fallback: false };
    }
    throw new Error(`EmailJS status ${response.status}: ${response.text}`);
  } catch (err) {
    console.error("EmailJS send error:", err);
    return { sent: false, code, fallback: true, error: err.message || String(err) };
  }
}

/* ═══════════════════════════════════════════════════════
   PERSISTENT STORAGE HELPERS
═══════════════════════════════════════════════════════ */
const KEYS={
  users:"lh_users",sessions:"lh_sessions",courses:"lh_courses",
  progress:"lh_progress",verifications:"lh_verifications"
};
const store={
  get:(k)=>{try{return JSON.parse(localStorage.getItem(k))||null}catch{return null}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}},
};

function initStorage(){
  if(!store.get(KEYS.users)){
    store.set(KEYS.users,[{
      id:"admin",email:"admin@learnhub.dev",name:"Admin",
      password:"Admin@123",role:"admin",verified:true,
      avatar:"",bio:"Platform administrator",
      joinedAt:new Date().toISOString(),enrolledCourses:[]
    }]);
  }
  // Seed and sync bundled courses — adds new courses and updates existing ones with latest bundled data
  const BUNDLED_COURSES=[NODEJS_30DAY_COURSE,FRONTEND_ROADMAP_COURSE,SQL_MONGODB_20DAY_COURSE,AI_FIRST_WEBDEV_COURSE];
  const stored=store.get(KEYS.courses)||[];
  const bundledMap=Object.fromEntries(BUNDLED_COURSES.map(c=>[c.id,c]));
  // Replace stored bundled courses with latest data; keep any admin-created courses untouched
  const merged=stored.map(c=>bundledMap[c.id]||c);
  BUNDLED_COURSES.forEach(c=>{if(!merged.find(s=>s.id===c.id))merged.push(c);});
  store.set(KEYS.courses,merged);
}
