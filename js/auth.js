/* ═══════════════════════════════════════════════════════
   AUTH HELPERS
═══════════════════════════════════════════════════════ */
function hashPassword(p){
  let h=0;for(let i=0;i<p.length;i++){h=((h<<5)-h)+p.charCodeAt(i);h|=0;}return h.toString(36);
}
function generateId(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8);}
function generateVerificationCode(){return Math.floor(100000+Math.random()*900000).toString();}

async function getCurrentUser(){
  const sid=sessionStorage.getItem("lh_session");
  if(!sid)return null;
  return await fbGetUser(sid);
}
function loginUser(user){sessionStorage.setItem("lh_session",user.id);}
function logoutUser(){sessionStorage.removeItem("lh_session");}

async function getUserProgress(userId,courseId){
  return await fbGetProgress(userId,courseId);
}
async function saveUserProgress(userId,courseId,progress){
  await fbSaveProgress(userId,courseId,progress);
}
