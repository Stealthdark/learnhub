/* ═══════════════════════════════════════════════════════
   ADMIN — COURSES
═══════════════════════════════════════════════════════ */
function AdminCourses({showToast}){
  const[courses,setCourses]=useState(store.get(KEYS.courses)||[]);
  const[showModal,setShowModal]=useState(false);
  const[form,setForm]=useState({title:"",subtitle:"",description:"",category:"",level:"Beginner",duration:"",dailyEffort:"",prerequisites:"",outcome:""});
  const[errors,setErrors]=useState({});
  const[importing,setImporting]=useState(false);
  const fileRef=useRef();

  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  function validate(){
    const e={};
    if(!form.title.trim())e.title="Title required";
    if(!form.description.trim())e.description="Description required";
    return e;
  }

  function handleSave(){
    const e=validate();
    if(Object.keys(e).length){setErrors(e);return;}
    const newCourse={
      ...form,id:generateId(),weeks:[],days:[],
      createdAt:new Date().toISOString()
    };
    const updated=[...courses,newCourse];
    store.set(KEYS.courses,updated);
    setCourses(updated);
    setShowModal(false);
    setForm({title:"",subtitle:"",description:"",category:"",level:"Beginner",duration:"",dailyEffort:"",prerequisites:"",outcome:""});
    showToast("Course created!","success");
  }

  function deleteCourse(id){
    if(!confirm("Delete this course?"))return;
    const updated=courses.filter(c=>c.id!==id);
    store.set(KEYS.courses,updated);
    setCourses(updated);
    showToast("Course deleted","info");
  }

  // Extracts a course data JS object from a script's text content.
  // Uses bracket-counting so nested objects/arrays are handled correctly.
  function extractCourseObjectFromScript(scriptText){
    // Patterns that indicate a course data variable
    const varPatterns=[
      /(?:const|var|let)\s+(COURSE_DATA)\s*=/,
      /(?:const|var|let)\s+(\w*COURSE\w*)\s*=/,
    ];
    for(const pattern of varPatterns){
      const match=scriptText.match(pattern);
      if(!match)continue;
      const afterEq=scriptText.indexOf("=",scriptText.indexOf(match[0]))+1;
      const braceStart=scriptText.indexOf("{",afterEq);
      if(braceStart===-1)continue;
      // Walk forward counting braces/brackets to find the matching closing brace,
      // skipping string literals so quoted { } don't count.
      let depth=0,inStr=false,strChar="",i=braceStart;
      for(;i<scriptText.length;i++){
        const ch=scriptText[i];
        if(inStr){
          if(ch===strChar&&scriptText[i-1]!=="\\")inStr=false;
        }else if(ch==='"'||ch==="'"||ch==="`"){
          inStr=true;strChar=ch;
        }else if(ch==="{")depth++;
        else if(ch==="}"){depth--;if(depth===0)break;}
      }
      if(depth!==0)continue;
      const objStr=scriptText.slice(braceStart,i+1);
      try{
        const result=new Function(`"use strict";return (${objStr})`)();
        if(result&&typeof result==="object"&&result.title&&Array.isArray(result.days))return result;
      }catch(err){console.warn("Could not evaluate extracted course object:",err);}
    }
    return null;
  }

  function handleImport(e){
    const file=e.target.files[0];
    if(!file)return;
    setImporting(true);
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const html=ev.target.result;
        const parser=new DOMParser();
        const doc=parser.parseFromString(html,"text/html");

        // 1. Try to extract full structured course data from any script tag
        let courseData=null;
        const scripts=Array.from(doc.querySelectorAll("script"));
        for(const script of scripts){
          const content=script.textContent||"";
          // Quick pre-check: skip scripts that clearly have no course data
          if(!content.includes("days:")&&!content.includes('"days"'))continue;
          courseData=extractCourseObjectFromScript(content);
          if(courseData)break;
        }

        if(courseData&&courseData.title&&Array.isArray(courseData.days)){
          // Full structured course data found — import as-is
          const imported={
            ...courseData,
            id:courseData.id||generateId(),
            createdAt:courseData.createdAt||new Date().toISOString(),
          };
          const updated=[...courses,imported];
          store.set(KEYS.courses,updated);
          setCourses(updated);
          showToast(`"${imported.title}" imported — ${imported.days.length} days of content!`,"success");
        }else{
          // 2. Fallback: metadata-only import from HTML tags
          const titleEl=doc.querySelector("title");
          const title=titleEl?titleEl.textContent.replace("Dev. Harshit | ","").trim():"Imported Course";
          const metaDesc=doc.querySelector('meta[name="description"]');
          const description=metaDesc?metaDesc.getAttribute("content"):"Imported from HTML file.";
          const newCourse={
            id:generateId(),title,subtitle:"",description,
            category:"",level:"Beginner",duration:"",
            dailyEffort:"",prerequisites:"",outcome:"",
            weeks:[],days:[],
            createdAt:new Date().toISOString()
          };
          const updated=[...courses,newCourse];
          store.set(KEYS.courses,updated);
          setCourses(updated);
          showToast(`"${title}" imported (no structured content found — edit to add days).`,"info");
        }
      }catch(err){
        console.error("Import error:",err);
        showToast("Could not parse file — check the console for details.","error");
      }
      setImporting(false);
    };
    reader.readAsText(file);
    e.target.value="";
  }

  return(
    <div className="page-pad" style={{maxWidth:1100}}>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:24}}>
        <div>
          <h1 className="h1" style={{marginBottom:4}}>Manage Courses</h1>
          <p style={{color:"var(--text2)",fontSize:14}}>Create, upload, and manage learning content.</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <input type="file" accept=".html" ref={fileRef} style={{display:"none"}} onChange={handleImport}/>
          <button className="btn btn-ghost btn-sm" onClick={()=>fileRef.current.click()} disabled={importing}>
            {importing?<><span className="spinner spinner-dark"/>Importing…</>:<><Icon.Upload/> Import HTML</>}
          </button>
          <button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><Icon.Plus/> New Course</button>
        </div>
      </div>

      {courses.length===0?(
        <div className="card" style={{padding:"40px 24px",textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:12}}>📚</div>
          <p style={{color:"var(--text2)",fontSize:14}}>No courses yet. Create your first course.</p>
        </div>
      ):(
        <div className="table-scroll card">
          <table className="table">
            <thead><tr><th>Title</th><th>Category</th><th>Level</th><th>Days</th><th>Actions</th></tr></thead>
            <tbody>
              {courses.map(c=>(
                <tr key={c.id}>
                  <td><div style={{fontWeight:600,fontSize:13}}>{c.title}</div><div style={{fontSize:11,color:"var(--text3)"}}>{c.subtitle}</div></td>
                  <td><span className="chip chip-blue" style={{fontSize:11}}>{c.category||"—"}</span></td>
                  <td><span className="chip chip-purple" style={{fontSize:11}}>{c.level||"—"}</span></td>
                  <td><span style={{fontFamily:"'Roboto Mono',monospace",fontSize:12}}>{c.days?.length||0}</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={()=>deleteCourse(c.id)} style={{color:"var(--red)"}}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:18,fontWeight:500}}>Create New Course</span>
              <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--text2)"}} onClick={()=>setShowModal(false)}><Icon.Close/></button>
            </div>
            <div className="modal-body">
              {[["title","Course Title","e.g. 30-Day React Mastery"],["subtitle","Subtitle","Short tagline"],["category","Category","e.g. Frontend, Backend"],["duration","Duration","e.g. 30 Days"],["dailyEffort","Daily Effort","e.g. 2–3 Hours"],["prerequisites","Prerequisites","e.g. HTML/CSS basics"],["outcome","Outcome","e.g. Build a full app"]].map(([k,lbl,ph])=>(
                <div className="form-group" key={k}>
                  <label className="label">{lbl}</label>
                  <input className={`input${errors[k]?" error":""}`} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)}/>
                  {errors[k]&&<p className="error-text">{errors[k]}</p>}
                </div>
              ))}
              <div className="form-group">
                <label className="label">Level</label>
                <select className="input" value={form.level} onChange={e=>set("level",e.target.value)}>
                  {["Beginner","Intermediate","Advanced"].map(l=><option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="label">Description</label>
                <textarea className={`input${errors.description?" error":""}`} rows={4} value={form.description} onChange={e=>set("description",e.target.value)} style={{resize:"vertical"}}/>
                {errors.description&&<p className="error-text">{errors.description}</p>}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Create Course</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
