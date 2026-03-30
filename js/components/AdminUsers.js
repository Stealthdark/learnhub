/* ═══════════════════════════════════════════════════════
   ADMIN — USERS
═══════════════════════════════════════════════════════ */
function AdminUsers({showToast}){
  const[users,setUsers]=useState([]);
  const[courses,setCourses]=useState([]);
  const[selected,setSelected]=useState(null);
  const[search,setSearch]=useState("");
  const[progressMap,setProgressMap]=useState({});
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    Promise.all([fbGetUsers(),fbGetCourses()]).then(([u,c])=>{
      setUsers(u);setCourses(c);setLoading(false);
    });
  },[]);

  useEffect(()=>{
    if(!selected||(selected.enrolledCourses||[]).length===0){setProgressMap({});return;}
    Promise.all(
      selected.enrolledCourses.map(cid=>
        getUserProgress(selected.id,cid).then(prog=>[cid,prog])
      )
    ).then(entries=>setProgressMap(Object.fromEntries(entries)));
  },[selected?.id]);

  async function refresh(){
    const u=await fbGetUsers();
    setUsers(u);
  }

  async function toggleRole(uid){
    const u=users.find(x=>x.id===uid);
    if(!u)return;
    const updated={...u,role:u.role==="admin"?"user":"admin"};
    await fbSetUser(updated);
    await refresh();
    showToast("Role updated","success");
  }

  async function deleteUser(uid){
    if(!confirm("Delete this user permanently?"))return;
    await fbDeleteUser(uid);
    setSelected(null);
    await refresh();
    showToast("User deleted","info");
  }

  const filtered=users.filter(u=>
    u.name.toLowerCase().includes(search.toLowerCase())||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if(loading){
    return(
      <div className="page-pad" style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:200}}>
        <span className="spinner" style={{width:28,height:28}}/>
      </div>
    );
  }

  return(
    <div className="page-pad" style={{maxWidth:1100}}>
      <h1 className="h1" style={{marginBottom:4}}>User Management</h1>
      <p style={{color:"var(--text2)",marginBottom:20,fontSize:14}}>View and manage all registered learners.</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:16,alignItems:"center"}}>
        <input className="input" placeholder="Search by name or email..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:280,flex:1}}/>
        <span className="chip chip-blue">{users.length} total</span>
        <span className="chip chip-green">{users.filter(u=>u.verified).length} verified</span>
      </div>
      <div className={`users-layout${selected?" has-selected":""}`}>
        <div className="table-scroll card">
          <table className="table">
            <thead><tr><th>User</th><th>Role</th><th>Verified</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(u=>(
                <tr key={u.id} style={{background:selected?.id===u.id?"var(--primary-light)":""}}>
                  <td onClick={()=>setSelected(u)} style={{cursor:"pointer"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <AvatarEl user={u} size={28}/>
                      <div>
                        <div style={{fontSize:13,fontWeight:600}}>{u.name}</div>
                        <div style={{fontSize:11,color:"var(--text3)"}}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`chip ${u.role==="admin"?"chip-amber":"chip-blue"}`} style={{fontSize:11}}>{u.role}</span></td>
                  <td>{u.verified?<span className="chip chip-green" style={{fontSize:11}}>✓</span>:<span className="chip chip-red" style={{fontSize:11}}>Pending</span>}</td>
                  <td>
                    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                      <button className="btn btn-ghost btn-sm" onClick={()=>toggleRole(u.id)} style={{fontSize:11,padding:"3px 8px"}}>{u.role==="admin"?"→User":"→Admin"}</button>
                      {u.id!=="admin"&&<button className="btn btn-ghost btn-sm" onClick={()=>deleteUser(u.id)} style={{color:"var(--red)",fontSize:11,padding:"3px 8px"}}>Del</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected&&(
          <div className="user-detail-panel">
            <div className="card" style={{padding:20,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:15,fontWeight:500}}>User Profile</div>
                <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--text3)",padding:4,display:"flex"}} onClick={()=>setSelected(null)}><Icon.Close/></button>
              </div>
              <div style={{textAlign:"center",marginBottom:16}}>
                <AvatarEl user={selected} size={56}/>
                <div style={{fontSize:15,fontWeight:600,marginTop:10}}>{selected.name}</div>
                <div style={{fontSize:13,color:"var(--text2)"}}>{selected.email}</div>
                {selected.bio&&<div style={{fontSize:12,color:"var(--text3)",marginTop:4}}>{selected.bio}</div>}
              </div>
              <div className="divider"/>
              {[["Role",selected.role],["Verified",selected.verified?"Yes ✓":"No"],["Joined",new Date(selected.joinedAt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:13,borderBottom:"1px solid var(--border)"}}>
                  <span style={{color:"var(--text2)"}}>{k}</span><span style={{fontWeight:500}}>{v}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{padding:16}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Course Progress</div>
              {(selected.enrolledCourses||[]).length===0?(
                <p style={{fontSize:13,color:"var(--text3)"}}>Not enrolled in any courses.</p>
              ):(
                (selected.enrolledCourses||[]).map(cid=>{
                  const course=courses.find(c=>c.id===cid);
                  if(!course)return null;
                  const prog=progressMap[cid]||{completed:[]};
                  const pct=Math.round((prog.completed.length/(course.days?.length||1))*100);
                  return(
                    <div key={cid} style={{marginBottom:12}}>
                      <div style={{fontSize:13,fontWeight:500,marginBottom:4}}>{course.title}</div>
                      <div className="progress-bar-track" style={{marginBottom:4}}>
                        <div className="progress-bar-fill" style={{width:pct+"%"}}/>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--text3)"}}>
                        <span>{prog.completed.length}/{course.days?.length} lessons</span>
                        <span>{pct}%</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
