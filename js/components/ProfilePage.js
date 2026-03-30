/* ═══════════════════════════════════════════════════════
   PROFILE PAGE
═══════════════════════════════════════════════════════ */
function ProfilePage({user,updateUser,showToast}){
  const[form,setForm]=useState({name:user.name,email:user.email,bio:user.bio||"",currentPassword:"",newPassword:"",confirmNewPassword:""});
  const[errors,setErrors]=useState({});
  const[tab,setTab]=useState("profile");
  const[courses,setCourses]=useState([]);
  const[progressMap,setProgressMap]=useState({});
  const fileRef=useRef();
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

  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  async function handleProfileSave(){
    const e={};
    if(!form.name.trim())e.name="Name required";
    if(Object.keys(e).length){setErrors(e);return;}
    const updated={...user,name:form.name,bio:form.bio};
    await fbSetUser(updated);
    updateUser(updated);
    showToast("Profile updated!","success");setErrors({});
  }

  async function handlePasswordSave(){
    const e={};
    if(form.currentPassword!==user.password)e.currentPassword="Incorrect current password";
    if(form.newPassword.length<8)e.newPassword="Min 8 characters";
    if(form.newPassword!==form.confirmNewPassword)e.confirmNewPassword="Passwords don't match";
    if(Object.keys(e).length){setErrors(e);return;}
    const updated={...user,password:form.newPassword};
    await fbSetUser(updated);
    updateUser(updated);
    showToast("Password changed!","success");
    setForm(f=>({...f,currentPassword:"",newPassword:"",confirmNewPassword:""}));setErrors({});
  }

  function handleAvatar(e){
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=async ev=>{
      const updated={...user,avatar:ev.target.result};
      await fbSetUser(updated);
      updateUser(updated);
      showToast("Avatar updated!","success");
    };
    reader.readAsDataURL(file);
  }

  return(
    <div className="page-pad" style={{maxWidth:680}}>
      <h1 className="h1" style={{marginBottom:20}}>Account Settings</h1>
      <div className="profile-tabs" style={{marginBottom:24}}>
        {["profile","security","activity"].map(t=>(
          <button key={t} onClick={()=>{setTab(t);setErrors({});}}
            style={{color:tab===t?"var(--primary)":"var(--text2)",borderBottomColor:tab===t?"var(--primary)":"transparent",fontFamily:"'Google Sans',sans-serif"}}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      {tab==="profile"&&(
        <div>
          <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:16,marginBottom:24,padding:16,background:"var(--bg)",borderRadius:12}}>
            <AvatarEl user={user} size={64}/>
            <div>
              <div style={{fontSize:16,fontWeight:600,marginBottom:2}}>{user.name}</div>
              <div style={{fontSize:13,color:"var(--text2)",marginBottom:10}}>{user.email}</div>
              <input type="file" accept="image/*" ref={fileRef} style={{display:"none"}} onChange={handleAvatar}/>
              <button className="btn btn-secondary btn-sm" onClick={()=>fileRef.current.click()}>Change Photo</button>
            </div>
          </div>
          <div className="form-group"><label className="label">Full Name</label>
            <input className={`input${errors.name?" error":""}`} value={form.name} onChange={e=>set("name",e.target.value)}/>
            {errors.name&&<p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group"><label className="label">Email Address</label>
            <input className="input" value={form.email} disabled style={{background:"var(--bg)",cursor:"not-allowed"}}/>
            <p style={{fontSize:12,color:"var(--text3)",marginTop:4}}>Email cannot be changed</p>
          </div>
          <div className="form-group"><label className="label">Bio</label>
            <textarea className="input" rows={3} placeholder="Tell us about yourself..." value={form.bio} onChange={e=>set("bio",e.target.value)} style={{resize:"vertical"}}/>
          </div>
          <button className="btn btn-primary" onClick={handleProfileSave}>Save Changes</button>
        </div>
      )}
      {tab==="security"&&(
        <div>
          <div className="card" style={{padding:20,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:500,marginBottom:16}}>Change Password</h3>
            {[["currentPassword","Current Password","password"],["newPassword","New Password","password"],["confirmNewPassword","Confirm New Password","password"]].map(([k,lbl,type])=>(
              <div className="form-group" key={k}><label className="label">{lbl}</label>
                <input className={`input${errors[k]?" error":""}`} type={type} value={form[k]} onChange={e=>set(k,e.target.value)}/>
                {errors[k]&&<p className="error-text">{errors[k]}</p>}
              </div>
            ))}
            <button className="btn btn-primary" onClick={handlePasswordSave}>Update Password</button>
          </div>
          <div className="card" style={{padding:20}}>
            <h3 style={{fontSize:15,fontWeight:500,marginBottom:12}}>Account Info</h3>
            {[["Account Type",user.role==="admin"?"Administrator":"Learner"],["Member Since",new Date(user.joinedAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})],["Email Verified",user.verified?"Yes ✓":"Pending"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)",fontSize:13}}>
                <span style={{color:"var(--text2)"}}>{k}</span><span style={{fontWeight:500}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="activity"&&(
        <div>
          <h3 style={{fontSize:15,fontWeight:500,marginBottom:14}}>Enrolled Courses</h3>
          {enrolled.length===0?(<div className="card" style={{padding:28,textAlign:"center",color:"var(--text2)"}}>No courses enrolled yet.</div>):(
            enrolled.map(cid=>{
              const course=courses.find(c=>c.id===cid);if(!course)return null;
              const prog=progressMap[cid]||{completed:[]};
              const pct=Math.round((prog.completed.length/(course.days?.length||1))*100);
              return(
                <div key={cid} className="card" style={{padding:16,marginBottom:10,display:"flex",flexWrap:"wrap",alignItems:"center",gap:12}}>
                  <div style={{flex:1,minWidth:180}}>
                    <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{course.title}</div>
                    <div className="progress-bar-track" style={{marginBottom:4}}>
                      <div className="progress-bar-fill" style={{width:pct+"%"}}/>
                    </div>
                    <div style={{fontSize:11,color:"var(--text3)"}}>{prog.completed.length}/{course.days?.length} days · {pct}%</div>
                  </div>
                  <span className={`chip ${pct===100?"chip-green":"chip-blue"}`}>{pct===100?"Completed":"In Progress"}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
