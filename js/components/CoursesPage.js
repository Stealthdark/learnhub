/* ═══════════════════════════════════════════════════════
   COURSES LIST
═══════════════════════════════════════════════════════ */
function CoursesPage({user,setPage,updateUser,showToast}){
  const[courses,setCourses]=useState([]);
  const[progressMap,setProgressMap]=useState({});
  const enrolled=user.enrolledCourses||[];

  useEffect(()=>{
    fbGetCourses().then(setCourses);
  },[]);

  useEffect(()=>{
    if(!enrolled.length)return;
    Promise.all(
      enrolled.map(cid=>getUserProgress(user.id,cid).then(prog=>[cid,prog]))
    ).then(entries=>setProgressMap(Object.fromEntries(entries)));
  },[user.id,enrolled.join(',')]);

  async function enroll(courseId){
    if(enrolled.includes(courseId))return;
    const updated={...user,enrolledCourses:[...enrolled,courseId]};
    await fbSetUser(updated);
    updateUser(updated);
    showToast("Enrolled successfully!","success");
  }

  return(
    <div className="page-pad" style={{maxWidth:1100}}>
      <h1 className="h1" style={{marginBottom:4}}>Course Catalog</h1>
      <p style={{color:"var(--text2)",marginBottom:24,fontSize:14}}>Explore our curated learning roadmaps.</p>
      <div className="grid-courses">
        {courses.map(course=>{
          const isEnrolled=enrolled.includes(course.id);
          const prog=isEnrolled?(progressMap[course.id]||{completed:[]}):{completed:[]};
          const pct=isEnrolled?Math.round((prog.completed.length/(course.days?.length||1))*100):0;
          return(
            <div key={course.id} className="card" style={{overflow:"hidden",display:"flex",flexDirection:"column"}}>
              {/* Image section — pure visual, no text overlay */}
              {course.image?(
                <div style={{height:120,overflow:"hidden",flexShrink:0}}>
                  <img src={course.image} alt={course.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                </div>
              ):(
                <div style={{height:80,background:"linear-gradient(135deg,var(--primary) 0%,#4a90e2 100%)",flexShrink:0}}/>
              )}
              {/* Dedicated header section — badges + title + subtitle */}
              <div style={{background:course.weeks?.[0]?.colorSoft||"var(--surface)",borderBottom:"1px solid var(--border)",padding:"12px 16px"}}>
                <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:5,marginBottom:7}}>
                  <span style={{background:"var(--primary-light)",color:"var(--primary)",padding:"2px 10px",borderRadius:100,fontSize:11,fontWeight:600}}>{course.level}</span>
                  <span style={{background:"var(--bg)",color:"var(--text2)",padding:"2px 10px",borderRadius:100,fontSize:11,fontWeight:600,border:"1px solid var(--border)"}}>{course.category}</span>
                </div>
                <h2 style={{fontSize:16,fontWeight:700,fontFamily:"'Google Sans',sans-serif",marginBottom:3,lineHeight:1.3,color:"var(--text)"}}>{course.title}</h2>
                <p style={{fontSize:11,color:"var(--text2)",lineHeight:1.4,margin:0}}>{course.subtitle}</p>
              </div>
              <div style={{padding:"16px 20px",flex:1,display:"flex",flexDirection:"column"}}>
                <p style={{fontSize:13,color:"var(--text2)",marginBottom:14,lineHeight:1.6,flex:1}}>{course.description.slice(0,130)}...</p>
                <div className="grid-2col" style={{marginBottom:16}}>
                  {[["Duration",course.duration],["Daily",course.dailyEffort],["Prereqs",course.prerequisites],["Outcome",course.outcome]].map(([k,v])=>(
                    <div key={k} style={{background:"var(--bg)",borderRadius:6,padding:"8px 10px"}}>
                      <div style={{fontSize:10,color:"var(--text3)",fontWeight:600,textTransform:"uppercase",letterSpacing:".04em"}}>{k}</div>
                      <div style={{fontSize:12,fontWeight:500,color:"var(--text)",marginTop:1}}>{v}</div>
                    </div>
                  ))}
                </div>
                {isEnrolled?(
                  <div>
                    <div className="progress-bar-track" style={{marginBottom:6}}>
                      <div className="progress-bar-fill" style={{width:pct+"%"}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--text3)",marginBottom:12}}>
                      <span>{prog.completed.length}/{course.days?.length} lessons</span><span>{pct}% complete</span>
                    </div>
                    <button className="btn btn-primary btn-full" onClick={()=>setPage("course_"+course.id)}>
                      {pct>0?"Continue Learning →":"Start Course →"}
                    </button>
                  </div>
                ):(
                  <button className="btn btn-primary btn-full" onClick={()=>enroll(course.id)}>Enroll Now — Free</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
