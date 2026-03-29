/* ═══════════════════════════════════════════════════════
   AUTH HELPERS
═══════════════════════════════════════════════════════ */
function hashPassword(p){
  let h=0;for(let i=0;i<p.length;i++){h=((h<<5)-h)+p.charCodeAt(i);h|=0;}return h.toString(36);
}
function generateId(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8);}
function generateVerificationCode(){return Math.floor(100000+Math.random()*900000).toString();}

function getCurrentUser(){
  const sid=sessionStorage.getItem("lh_session");
  if(!sid)return null;
  const users=store.get(KEYS.users)||[];
  return users.find(u=>u.id===sid)||null;
}
function loginUser(user){sessionStorage.setItem("lh_session",user.id);}
function logoutUser(){sessionStorage.removeItem("lh_session");}

function getUserProgress(userId,courseId){
  const all=store.get(KEYS.progress)||{};
  return all[`${userId}_${courseId}`]||{completed:[],lastUpdated:null};
}
function saveUserProgress(userId,courseId,progress){
  const all=store.get(KEYS.progress)||{};
  all[`${userId}_${courseId}`]={...progress,lastUpdated:new Date().toISOString()};
  store.set(KEYS.progress,all);
}
