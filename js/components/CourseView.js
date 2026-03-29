/* ═══════════════════════════════════════════════════════
   COURSE VIEW
═══════════════════════════════════════════════════════ */
function CourseView({courseId,user,updateUser,showToast}){
  const courses=store.get(KEYS.courses)||[];
  const course=courses.find(c=>c.id===courseId);
  const[progress,setProgress]=useState(()=>getUserProgress(user.id,courseId));
  const[expandedDays,setExpandedDays]=useState(new Set());
  if(!course)return<div className="page-pad" style={{color:"var(--text2)"}}>Course not found.</div>;
  const completed=new Set(progress.completed||[]);
  const pct=Math.round((completed.size/(course.days?.length||1))*100);
  function toggleComplete(dayId){
    const newSet=new Set(completed);
    newSet.has(dayId)?newSet.delete(dayId):newSet.add(dayId);
    const newProg={...progress,completed:[...newSet]};
    setProgress(newProg);
    saveUserProgress(user.id,courseId,newProg);
  }
  function toggleExpand(dayId){
    setExpandedDays(prev=>{const n=new Set(prev);n.has(dayId)?n.delete(dayId):n.add(dayId);return n;});
  }
  const tagClass=(tag)=>{
    if(tag==="Concept")return"chip chip-blue";
    if(tag==="Practice")return"chip chip-green";
    if(tag==="Project")return"chip chip-amber";
    if(tag==="Advanced")return"chip chip-purple";
    if(tag==="HTML")return"chip chip-red";
    if(tag==="CSS")return"chip chip-cyan";
    if(tag==="JavaScript")return"chip chip-amber";
    return"chip chip-blue";
  };
  const defaultColors=["#7c4dff","#007b83","#137333","#e37400","#1a73e8","#c5221f"];
  const weekColors=course.weeks.map((w,i)=>w.color||defaultColors[i%defaultColors.length]);
  return(
    <div className="page-pad" style={{maxWidth:980}}>
      {/* Hero */}
      <div className="card hero-card" style={{marginBottom:16,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,width:200,height:200,background:"radial-gradient(circle at top right,rgba(26,115,232,.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{marginBottom:12,display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
          <span className="chip chip-blue">{course.category}</span>
          <span className="chip chip-purple">{course.level}</span>
          <div className="verified-badge"><Icon.Check/>Roadmap</div>
        </div>
        <h1 style={{fontFamily:"'Google Sans',sans-serif",fontSize:22,fontWeight:700,marginBottom:8,lineHeight:1.3}}>{course.title}</h1>
        <p style={{color:"var(--text2)",fontSize:13,marginBottom:16,lineHeight:1.7}}>{course.description}</p>
        <div className="course-meta">
          {[["Duration",course.duration],["Daily Effort",course.dailyEffort],["Prerequisites",course.prerequisites],["Outcome",course.outcome]].map(([k,v])=>(
            <div key={k}><div style={{fontSize:10,color:"var(--text3)",fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>{k}</div><div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{v}</div></div>
          ))}
        </div>
      </div>
      {/* Progress */}
      <div className="card" style={{padding:"16px 20px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:"var(--text2)"}}>Overall Progress</span>
          <span style={{fontFamily:"'Roboto Mono',monospace",fontSize:20,fontWeight:500,color:"var(--primary)"}}>{pct}%</span>
        </div>
        <div className="progress-bar-track" style={{height:8,marginBottom:14}}>
          <div className="progress-bar-fill" style={{width:pct+"%"}}/>
        </div>
        <div className="grid-weeks">
          {course.weeks.map((w,wi)=>{
            const wDone=w.days.filter(d=>completed.has(d)).length;
            const wPct=Math.round((wDone/w.days.length)*100);
            return(
              <div key={w.id}>
                <div style={{fontSize:10,color:"var(--text3)",marginBottom:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{w.label}</div>
                <div style={{height:4,background:"var(--bg)",borderRadius:2,overflow:"hidden"}}>
                  <div style={{height:"100%",width:wPct+"%",background:weekColors[wi],borderRadius:2,transition:"width .5s ease"}}/>
                </div>
                <div style={{fontSize:10,color:"var(--text3)",marginTop:2}}>{wDone}/{w.days.length}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Week blocks */}
      {course.weeks.map((week,wi)=>(
        <div key={week.id} style={{marginBottom:28}}>
          <div className="week-header">
            <span style={{padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",background:weekColors[wi]+"20",color:weekColors[wi],border:`1px solid ${weekColors[wi]}40`,flexShrink:0}}>{week.label}</span>
            <span className="week-title-text">{week.title}</span>
            <span style={{fontFamily:"'Roboto Mono',monospace",fontSize:11,color:"var(--text3)",flexShrink:0}}>
              {week.days.filter(d=>completed.has(d)).length}/{week.days.length}
            </span>
          </div>
          {week.days.map(dayId=>{
            const day=course.days.find(d=>d.id===dayId);
            if(!day)return null;
            const isDone=completed.has(dayId);
            const isOpen=expandedDays.has(dayId);
            return(
              <div key={dayId} className={`day-card${isDone?" completed":""}${isOpen?" open":""}`}>
                <div className="day-header" onClick={()=>toggleExpand(dayId)}>
                  <div onClick={e=>{e.stopPropagation();toggleComplete(dayId);}}
                    style={{width:20,height:20,borderRadius:4,border:`2px solid ${isDone?"var(--green)":"var(--border)"}`,background:isDone?"var(--green)":"#fff",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",cursor:"pointer",flexShrink:0,transition:"all .15s"}}>
                    {isDone&&<Icon.Check/>}
                  </div>
                  <span style={{fontFamily:"'Roboto Mono',monospace",fontSize:10,color:"var(--text3)",flexShrink:0}}>D{String(dayId).padStart(2,"0")}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:isDone?"var(--green)":"var(--text)",textDecoration:isDone?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{day.title}</div>
                    <div style={{fontSize:11,color:"var(--text3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{day.subtitle}</div>
                  </div>
                  <div className="day-tags-wrap">
                    {day.tags.map(t=><span key={t} className={`chip ${tagClass(t)}`} style={{fontSize:10}}>{t}</span>)}
                    {isDone&&<span className="chip chip-green" style={{fontSize:10}}>✓</span>}
                  </div>
                  <span style={{color:"var(--text3)",display:"flex",flexShrink:0}}>{isOpen?<Icon.ChevronUp/>:<Icon.ChevronDown/>}</span>
                </div>
                {isOpen&&(
                  <div className="day-body">
                    <div className="day-body-grid" style={{marginBottom:14}}>
                      <div>
                        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:"var(--text3)",marginBottom:8}}>Topics to Cover</div>
                        <ul style={{listStyle:"none"}}>
                          {day.topics.map((t,i)=>(
                            <li key={i} style={{display:"flex",gap:8,padding:"3px 0",fontSize:13,color:"var(--text2)"}}>
                              <span style={{color:"var(--primary)",fontFamily:"'Roboto Mono',monospace",fontSize:11,marginTop:2,flexShrink:0}}>→</span>{t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:"var(--text3)",marginBottom:8}}>Resources</div>
                        <ul style={{listStyle:"none"}}>
                          {day.resources.map((r,i)=>(
                            <li key={i} style={{padding:"3px 0"}}>
                              <a href={r.url} target="_blank" rel="noopener" style={{fontSize:13,color:"var(--primary)",textDecoration:"none",display:"flex",alignItems:"flex-start",gap:6,fontWeight:500}}>
                                <span style={{fontFamily:"'Roboto Mono',monospace",fontSize:11,opacity:.7,flexShrink:0,marginTop:1}}>↗</span>{r.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div style={{background:"var(--primary-light)",border:"1px solid #aecbfa",borderRadius:6,padding:"10px 14px",fontSize:13,color:"var(--primary)",fontWeight:500,marginBottom:8}}>
                      <strong>Today's Goal:</strong> {day.goal}
                    </div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:5,fontFamily:"'Roboto Mono',monospace",fontSize:11,color:"var(--text3)",background:"var(--bg)",borderRadius:4,padding:"2px 8px"}}>⏱ {day.time}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
