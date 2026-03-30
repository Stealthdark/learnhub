/* ═══════════════════════════════════════════════════════
   AUTH HELPERS
═══════════════════════════════════════════════════════ */
function generateId(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8);}

async function getCurrentUser(){ return apiGetCurrentUser(); }
function loginUser(token){ sessionStorage.setItem("lh_token",token); }
function logoutUser(){ sessionStorage.removeItem("lh_token"); }

async function getUserProgress(userId,courseId){ return apiGetProgress(userId,courseId); }
async function saveUserProgress(userId,courseId,progress){ return apiSaveProgress(userId,courseId,progress); }
