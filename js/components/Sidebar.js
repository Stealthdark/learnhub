/* ═══════════════════════════════════════════════════════
   SIDEBAR + MOBILE NAV
═══════════════════════════════════════════════════════ */
function Sidebar({user,page,setPage,onLogout,open,onClose}){
  const isAdmin=user.role==="admin";
  const navItems=[
    {id:"dashboard",label:"Dashboard",icon:<Icon.Home/>},
    {id:"courses",label:"My Courses",icon:<Icon.Book/>},
    {id:"profile",label:"Profile",icon:<Icon.Settings/>},
    ...(isAdmin?[
      {id:"admin-courses",label:"Manage Courses",icon:<Icon.Upload/>},
      {id:"admin-users",label:"Users",icon:<Icon.Users/>},
      {id:"admin-email",label:"Email Settings",icon:<Icon.Mail/>},
    ]:[]),
  ];
  function go(id){setPage(id);onClose();}
  return(
    <>
      {/* Mobile overlay */}
      <div className={`sidebar-overlay${open?" show":""}`} onClick={onClose}/>
      <aside className={`sidebar${open?" open":""}`}>
        {/* Logo */}
        <div style={{padding:"16px 16px 14px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="assets/og/logo/learnhub-logo.png" alt="LearnHub Logo" style={{width:"34px",height:"34px",borderRadius:"8px",objectFit:"cover",flexShrink:0}}/>
            <div>
              <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:15,fontWeight:700,color:"var(--text)"}}>LearnHub.Dev</div>
              <div style={{fontSize:10,color:"var(--text3)"}}>{isAdmin?"Admin Panel":"Learning Platform"}</div>
            </div>
          </div>
          <button onClick={onClose} style={{display:"none",background:"none",border:"none",cursor:"pointer",color:"var(--text3)",padding:4}} className="sidebar-close-btn">
            <Icon.Close/>
          </button>
        </div>
        {/* Nav */}
        <nav style={{flex:1,padding:"10px 10px 0",overflowY:"auto"}}>
          {navItems.map(item=>(
            <button key={item.id} className={`nav-link${page===item.id?" active":""}`} onClick={()=>go(item.id)}>
              {item.icon}{item.label}
            </button>
          ))}
        </nav>
        {/* User footer */}
        <div style={{padding:14,borderTop:"1px solid var(--border)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <AvatarEl user={user} size={34}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
              <div style={{fontSize:11,color:"var(--text3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.email}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm btn-full" onClick={onLogout}>
            <Icon.Logout/> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
