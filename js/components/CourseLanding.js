/* ═══════════════════════════════════════════════════════
   PUBLIC COURSE LANDING PAGE
   Shown when visiting index.html?c=COURSE_ID
   No auth required — "Enroll" triggers sign-up flow.
═══════════════════════════════════════════════════════ */
function CourseLanding({courseId,user,onEnroll,showToast}){
  const courses=store.get(KEYS.courses)||[];
  const course=courses.find(c=>c.id===courseId);

  if(!course){
    return(
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",flexDirection:"column",gap:16,padding:24}}>
        <div style={{fontSize:56}}>😕</div>
        <h1 style={{fontFamily:"'Google Sans',sans-serif",fontSize:24,fontWeight:700,color:"var(--text)",margin:0}}>Course not found</h1>
        <p style={{color:"var(--text2)",fontSize:14,margin:0}}>This course link may be invalid or the course was removed.</p>
        <a href="index.html" style={{color:"var(--primary)",fontWeight:600,textDecoration:"none",fontSize:14}}>← Back to LearnHub</a>
      </div>
    );
  }

  const enrolled=user&&(user.enrolledCourses||[]).includes(courseId);
  const defaultColors=["#7c4dff","#007b83","#137333","#e37400","#1a73e8","#c5221f"];
  const accentColor=course.weeks?.[0]?.color||"#1a73e8";

  function handleEnrollClick(){
    if(user){
      // Already logged in — enroll handled by parent, just trigger
      onEnroll();
    }else{
      onEnroll();
    }
  }

  return(
    <div style={{minHeight:"100vh",background:"var(--bg)",fontFamily:"'Roboto',sans-serif"}}>

      {/* ── Sticky Nav ── */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="index.html" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}>
          <div style={{width:32,height:32,background:"var(--primary)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:16,fontWeight:700}}>L</div>
          <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:17,fontWeight:700,color:"var(--primary)"}}>LearnHub</span>
        </a>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {user?(
            <button className="btn btn-primary btn-sm" onClick={handleEnrollClick}>
              {enrolled?"Go to Course →":"Enroll Free →"}
            </button>
          ):(
            <>
              <button className="btn btn-ghost btn-sm" onClick={handleEnrollClick}>Sign In</button>
              <button className="btn btn-primary btn-sm" onClick={handleEnrollClick}>Enroll Free</button>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={{background:`linear-gradient(135deg, ${accentColor}18 0%, var(--bg) 60%)`,borderBottom:"1px solid var(--border)",padding:"56px 24px 48px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
            <span className="chip chip-blue">{course.category}</span>
            <span className="chip chip-purple">{course.level}</span>
            {course.weeks&&<span style={{background:accentColor+"20",color:accentColor,border:`1px solid ${accentColor}40`,padding:"2px 12px",borderRadius:100,fontSize:11,fontWeight:700}}>{course.weeks.length} Phases</span>}
          </div>
          <h1 style={{fontFamily:"'Google Sans',sans-serif",fontSize:"clamp(28px,5vw,52px)",fontWeight:700,color:"var(--text)",marginBottom:16,lineHeight:1.15}}>{course.title}</h1>
          <p style={{fontSize:"clamp(14px,2vw,18px)",color:"var(--text2)",lineHeight:1.7,marginBottom:32,maxWidth:680}}>{course.description}</p>

          {/* Stats */}
          <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:36}}>
            {[["📅",course.duration,"Duration"],["⏱",course.dailyEffort,"Daily Effort"],["🎯",course.prerequisites,"Prerequisites"],["🏆",course.outcome,"Outcome"]].filter(([,v])=>v).map(([icon,value,label])=>(
              <div key={label} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 18px",minWidth:130}}>
                <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
                <div style={{fontSize:12,fontWeight:600,color:"var(--text)"}}>{value}</div>
                <div style={{fontSize:10,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".06em",marginTop:2}}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
            <button
              className="btn btn-primary"
              style={{fontSize:16,padding:"14px 32px",borderRadius:10}}
              onClick={handleEnrollClick}
            >
              {user&&enrolled?"Continue Learning →":user?"Start Course — Free →":"Enroll Now — Free →"}
            </button>
            <span style={{fontSize:13,color:"var(--text3)"}}>No credit card required · Free forever</span>
          </div>
        </div>
      </div>

      {/* ── Curriculum Preview ── */}
      {course.weeks&&course.weeks.length>0&&(
        <div style={{maxWidth:860,margin:"0 auto",padding:"48px 24px"}}>
          <h2 style={{fontFamily:"'Google Sans',sans-serif",fontSize:24,fontWeight:700,color:"var(--text)",marginBottom:8}}>Course Curriculum</h2>
          <p style={{color:"var(--text2)",fontSize:14,marginBottom:32}}>{course.days?.length||0} lessons across {course.weeks.length} phase{course.weeks.length!==1?"s":""}</p>

          {course.weeks.map((week,wi)=>{
            const color=week.color||defaultColors[wi%defaultColors.length];
            const weekDays=(week.days||[]).map(id=>course.days?.find(d=>d.id===id)).filter(Boolean);
            return(
              <div key={week.id} style={{marginBottom:24,border:"1px solid var(--border)",borderRadius:12,overflow:"hidden"}}>
                <div style={{background:color+"15",borderBottom:`1px solid ${color}30`,padding:"14px 20px",display:"flex",alignItems:"center",gap:12}}>
                  <span style={{background:color+"25",color:color,border:`1px solid ${color}40`,padding:"3px 12px",borderRadius:100,fontSize:11,fontWeight:700}}>{week.label}</span>
                  <span style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{week.title}</span>
                  <span style={{marginLeft:"auto",fontSize:12,color:"var(--text3)",fontFamily:"'Roboto Mono',monospace"}}>{weekDays.length} days</span>
                </div>
                <div style={{padding:"4px 0"}}>
                  {weekDays.slice(0,5).map((day,di)=>(
                    <div key={day.id} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"10px 20px",borderBottom:di<Math.min(4,weekDays.length-1)?"1px solid var(--border)":"none"}}>
                      <span style={{fontFamily:"'Roboto Mono',monospace",fontSize:10,color:"var(--text3)",marginTop:3,flexShrink:0,minWidth:28}}>D{String(day.id).padStart(2,"0")}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{day.title}</div>
                        <div style={{fontSize:11,color:"var(--text3)",marginTop:1}}>{day.subtitle}</div>
                      </div>
                      <div style={{display:"flex",gap:4,flexWrap:"wrap",flexShrink:0}}>
                        {(day.tags||[]).slice(0,2).map(t=><span key={t} className="chip chip-blue" style={{fontSize:10}}>{t}</span>)}
                      </div>
                    </div>
                  ))}
                  {weekDays.length>5&&(
                    <div style={{padding:"10px 20px",fontSize:12,color:"var(--text3)"}}>+ {weekDays.length-5} more lessons in this phase</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Bottom CTA ── */}
      <div style={{background:`linear-gradient(135deg, ${accentColor}12 0%, var(--bg) 100%)`,borderTop:"1px solid var(--border)",padding:"56px 24px",textAlign:"center"}}>
        <h2 style={{fontFamily:"'Google Sans',sans-serif",fontSize:28,fontWeight:700,color:"var(--text)",marginBottom:12}}>Ready to start learning?</h2>
        <p style={{color:"var(--text2)",fontSize:15,marginBottom:28,maxWidth:480,margin:"0 auto 28px"}}>Join thousands of learners mastering {course.title.toLowerCase()}. Free, structured, and self-paced.</p>
        <button
          className="btn btn-primary"
          style={{fontSize:16,padding:"14px 40px",borderRadius:10}}
          onClick={handleEnrollClick}
        >
          {user&&enrolled?"Open My Course →":user?"Enroll Now — Free →":"Get Started Free →"}
        </button>
        <div style={{marginTop:16,fontSize:12,color:"var(--text3)"}}>No account required to browse · Sign up in 30 seconds</div>
      </div>

    </div>
  );
}
