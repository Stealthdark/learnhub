/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES — no-op since CSS is in css/styles.css
═══════════════════════════════════════════════════════ */
function GlobalStyles(){ return null; }

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
function App(){
  const[user,setUser]=useState(null);
  const[authChecked,setAuthChecked]=useState(false);
  const[page,setPage]=useState("dashboard");
  const[toast,setToast]=useState(null);
  const[sidebarOpen,setSidebarOpen]=useState(false);
  const[pendingCourseId,setPendingCourseId]=useState(null);
  const[showLanding,setShowLanding]=useState(false);
  const[onboarding,setOnboarding]=useState(false);

  useEffect(()=>{
    const init=async()=>{
      const u=await getCurrentUser();
      setUser(u);
      setAuthChecked(true);
      const params=new URLSearchParams(window.location.search);
      const courseParam=params.get("c");
      if(courseParam){
        setPendingCourseId(courseParam);
        if(u){
          await _enrollIfNeeded(u,courseParam);
          setPage("course_"+courseParam);
        }else{
          setShowLanding(true);
        }
      }
    };
    init();
  },[]);

  async function _enrollIfNeeded(u,courseId){
    if((u.enrolledCourses||[]).includes(courseId))return u;
    const updated=await apiEnrollCourse(u.id,courseId);
    setUser(updated);
    return updated;
  }

  function goPage(id){setPage(id);setSidebarOpen(false);}
  function showToast(msg,type="info"){setToast({msg,type});}
  function updateUser(u){setUser(u);}

  async function handleLogin(u,isNew=false){
    setUser(u);
    setShowLanding(false);
    if(isNew){
      setOnboarding(true);
    }else{
      if(pendingCourseId){
        await _enrollIfNeeded(u,pendingCourseId);
        setPage("course_"+pendingCourseId);
        setPendingCourseId(null);
      }else{
        setPage("dashboard");
      }
    }
  }

  async function handleOnboardingComplete(updatedUser){
    setOnboarding(false);
    if(pendingCourseId){
      await _enrollIfNeeded(updatedUser,pendingCourseId);
      setPage("course_"+pendingCourseId);
      setPendingCourseId(null);
    }else{
      setPage("dashboard");
    }
  }

  function handleLogout(){logoutUser();setUser(null);setPage("dashboard");setShowLanding(false);setOnboarding(false);}

  if(!authChecked){
    return(
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)"}}>
        <span className="spinner" style={{width:32,height:32}}/>
      </div>
    );
  }

  if(showLanding&&pendingCourseId&&!user){
    return(
      <>
        <GlobalStyles/>
        <CourseLanding
          courseId={pendingCourseId}
          user={null}
          onEnroll={()=>setShowLanding(false)}
          showToast={showToast}
        />
        <Toast toast={toast} onClose={()=>setToast(null)}/>
      </>
    );
  }

  if(!user){
    return(
      <>
        <GlobalStyles/>
        <AuthPage onLogin={handleLogin} showToast={showToast} pendingCourseId={pendingCourseId}/>
        <Toast toast={toast} onClose={()=>setToast(null)}/>
      </>
    );
  }

  if(onboarding){
    return(
      <>
        <GlobalStyles/>
        <Onboarding
          user={user}
          updateUser={updateUser}
          pendingCourseId={pendingCourseId}
          onComplete={handleOnboardingComplete}
          showToast={showToast}
        />
        <Toast toast={toast} onClose={()=>setToast(null)}/>
      </>
    );
  }

  let content=null;
  if(page==="dashboard")content=<Dashboard user={user} setPage={goPage}/>;
  else if(page==="courses")content=<CoursesPage user={user} setPage={goPage} updateUser={updateUser} showToast={showToast}/>;
  else if(page==="profile")content=<ProfilePage user={user} updateUser={updateUser} showToast={showToast}/>;
  else if(page==="admin-courses")content=<AdminCourses showToast={showToast}/>;
  else if(page==="admin-users")content=<AdminUsers showToast={showToast}/>;
  else if(page==="admin-email")content=<AdminEmailSettings showToast={showToast}/>;
  else if(page.startsWith("course_")){
    const cid=page.replace("course_","");
    content=<CourseView courseId={cid} user={user} updateUser={updateUser} showToast={showToast}/>;
  }

  const isAdmin=user.role==="admin";

  const bottomItems=[
    {id:"dashboard",label:"Home",icon:<Icon.Home/>},
    {id:"courses",label:"Courses",icon:<Icon.Book/>},
    {id:"profile",label:"Profile",icon:<Icon.Settings/>},
    ...(isAdmin?[{id:"admin-users",label:"Users",icon:<Icon.Users/>},{id:"admin-courses",label:"Admin",icon:<Icon.Admin/>}]:[]),
  ].slice(0,5);

  return(
    <>
      <GlobalStyles/>
      <div className="app-layout">
        <Sidebar user={user} page={page} setPage={goPage} onLogout={handleLogout} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
          <div className="mobile-topbar">
            <button onClick={()=>setSidebarOpen(true)} style={{background:"none",border:"none",cursor:"pointer",padding:6,color:"var(--text2)",display:"flex",alignItems:"center"}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </button>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:28,height:28,background:"var(--primary)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:700}}>L</div>
              <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:15,fontWeight:700,color:"var(--text)"}}>LearnHub</span>
            </div>
            <AvatarEl user={user} size={30}/>
          </div>
          <main className="app-main">{content}</main>
        </div>
      </div>
      <nav className="mobile-bottom-nav">
        {bottomItems.map(item=>(
          <button key={item.id} className={page===item.id||page.startsWith("course_")&&item.id==="courses"?"active":""} onClick={()=>goPage(item.id)}>
            {item.icon}<span>{item.label}</span>
          </button>
        ))}
      </nav>
      <Toast toast={toast} onClose={()=>setToast(null)}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
