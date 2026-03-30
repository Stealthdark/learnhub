/* ═══════════════════════════════════════════════════════
   ONBOARDING — shown after a new user's first sign-up.
   Collects bio + learning goal before entering the app.
═══════════════════════════════════════════════════════ */
function Onboarding({user,updateUser,pendingCourseId,onComplete,showToast}){
  const[bio,setBio]=useState("");
  const[goal,setGoal]=useState("");
  const[saving,setSaving]=useState(false);
  const[pendingCourse,setPendingCourse]=useState(null);

  const goals=["Frontend Developer","Backend Developer","Full-Stack Developer","DevOps / Cloud","Mobile Developer","Just Exploring"];

  useEffect(()=>{
    if(!pendingCourseId)return;
    apiGetCourses().then(courses=>{
      const c=courses.find(x=>x.id===pendingCourseId);
      if(c)setPendingCourse(c);
    }).catch(()=>{});
  },[pendingCourseId]);

  async function handleComplete(){
    setSaving(true);
    try{
      const updated=await apiUpdateUser(user.id,{bio:bio.trim(),goal,onboardingDone:true});
      updateUser(updated);
      onComplete(updated);
    }catch(err){
      showToast(err.message||"Failed to save","error");
      setSaving(false);
    }
  }

  async function handleSkip(){
    try{
      const updated=await apiUpdateUser(user.id,{onboardingDone:true});
      updateUser(updated);
      onComplete(updated);
    }catch{
      // Non-critical — proceed anyway with local state
      const updated={...user,onboardingDone:true};
      updateUser(updated);
      onComplete(updated);
    }
  }

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:"24px 16px"}}>
      <div className="card" style={{width:"100%",maxWidth:520,padding:"36px 32px"}}>

        {/* Welcome header */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:52,marginBottom:12}}>🎉</div>
          <h1 style={{fontFamily:"'Google Sans',sans-serif",fontSize:26,fontWeight:700,color:"var(--text)",marginBottom:8}}>
            Welcome, {user.name.split(" ")[0]}!
          </h1>
          <p style={{color:"var(--text2)",fontSize:14,lineHeight:1.7}}>
            You're almost set. Tell us a bit about yourself so we can tailor your experience.
          </p>
        </div>

        {/* Pending course context */}
        {pendingCourse&&(
          <div style={{background:"var(--primary-light)",border:"1px solid #aecbfa",borderRadius:8,padding:"12px 16px",marginBottom:24,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:18,flexShrink:0}}>📚</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"var(--primary)",marginBottom:2}}>You're enrolling in</div>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{pendingCourse.title}</div>
              <div style={{fontSize:11,color:"var(--text2)",marginTop:2}}>{pendingCourse.subtitle}</div>
            </div>
          </div>
        )}

        {/* Learning goal */}
        <div className="form-group">
          <label className="label">What's your learning goal?</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {goals.map(g=>(
              <button
                key={g}
                onClick={()=>setGoal(g)}
                style={{
                  padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:500,cursor:"pointer",
                  border:`1.5px solid ${goal===g?"var(--primary)":"var(--border)"}`,
                  background:goal===g?"var(--primary-light)":"transparent",
                  color:goal===g?"var(--primary)":"var(--text2)",
                  transition:"all .15s"
                }}
              >{g}</button>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="form-group">
          <label className="label">Short bio <span style={{color:"var(--text3)",fontWeight:400}}>(optional)</span></label>
          <textarea
            className="input"
            rows={3}
            placeholder="e.g. CS student exploring web dev, or frontend dev learning backend…"
            value={bio}
            onChange={e=>setBio(e.target.value)}
            maxLength={200}
            style={{resize:"vertical",lineHeight:1.6}}
          />
          <div style={{fontSize:11,color:"var(--text3)",textAlign:"right",marginTop:4}}>{bio.length}/200</div>
        </div>

        {/* Actions */}
        <button
          className="btn btn-primary btn-lg"
          onClick={handleComplete}
          disabled={saving}
          style={{width:"100%",justifyContent:"center",marginTop:8}}
        >
          {saving?<span className="spinner"/>:pendingCourse?"Complete Setup & Start Course →":"Complete Setup →"}
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={handleSkip}
          style={{width:"100%",justifyContent:"center",marginTop:10,color:"var(--text3)"}}
        >
          Skip for now
        </button>

      </div>
    </div>
  );
}
