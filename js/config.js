/* ═══════════════════════════════════════════════════════
   REACT HOOKS — destructure once, available globally
═══════════════════════════════════════════════════════ */
const {useState,useEffect,useCallback,useRef,useMemo}=React;

/* ═══════════════════════════════════════════════════════
   API BASE URL
   In production this points to the Render backend.
   In local dev it falls back to localhost:3001 (see api.js).
═══════════════════════════════════════════════════════ */
window.LEARNHUB_API_URL = "https://learnhub-9iey.onrender.com";

/* ═══════════════════════════════════════════════════════
   LEGACY STORAGE HELPERS (kept for backwards compat)
═══════════════════════════════════════════════════════ */
const KEYS={users:"lh_users",sessions:"lh_sessions",courses:"lh_courses",
  progress:"lh_progress",verifications:"lh_verifications"};
const store={
  get:(k)=>{try{return JSON.parse(localStorage.getItem(k))||null}catch{return null}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}},
};

function initStorage(){}
