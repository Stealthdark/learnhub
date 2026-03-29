/* ═══════════════════════════════════════════════════════
   AUTH SCREENS
═══════════════════════════════════════════════════════ */
function AuthPage({onLogin,showToast,pendingCourseId}){
  const[tab,setTab]=useState("login");
  const[form,setForm]=useState({name:"",email:"",password:"",confirmPassword:""});
  const[errors,setErrors]=useState({});
  const[loading,setLoading]=useState(false);
  const[showPass,setShowPass]=useState(false);
  const[pendingVerify,setPendingVerify]=useState(null);// {email, code}
  const[verifyInput,setVerifyInput]=useState("");
  const[verifyError,setVerifyError]=useState("");

  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  function validateSignup(){
    const e={};
    if(!form.name.trim())e.name="Name is required";
    if(!/\S+@\S+\.\S+/.test(form.email))e.email="Valid email required";
    if(form.password.length<8)e.password="Min 8 characters";
    if(!/[A-Z]/.test(form.password))e.password="Must contain uppercase";
    if(!/[0-9]/.test(form.password))e.password=(e.password?e.password+", ":"")+"Must contain number";
    if(form.password!==form.confirmPassword)e.confirmPassword="Passwords don't match";
    return e;
  }

  function handleLogin(){
    setLoading(true);setErrors({});
    setTimeout(()=>{
      const users=store.get(KEYS.users)||[];
      const user=users.find(u=>u.email.toLowerCase()===form.email.toLowerCase());
      if(!user||hashPassword(form.password)!==hashPassword(user.password)||(user.password!==form.password&&hashPassword(form.password)!==form.password)){
        // simple: compare directly (we store plain for simplicity/demo)
        const u2=users.find(u=>u.email.toLowerCase()===form.email.toLowerCase()&&u.password===form.password);
        if(!u2){setErrors({global:"Invalid email or password"});setLoading(false);return;}
        if(!u2.verified){setErrors({global:"Please verify your email first"});setLoading(false);return;}
        loginUser(u2);onLogin(u2,false);setLoading(false);return;
      }
      if(!user.verified){setErrors({global:"Please verify your email first"});setLoading(false);return;}
      loginUser(user);onLogin(user,false);setLoading(false);
    },600);
  }

  async function handleSignup(){
    const e=validateSignup();
    if(Object.keys(e).length){setErrors(e);return;}
    setLoading(true);
    const users=store.get(KEYS.users)||[];
    if(users.find(u=>u.email.toLowerCase()===form.email.toLowerCase())){
      setErrors({email:"Email already registered"});setLoading(false);return;
    }
    const code=generateVerificationCode();
    const vs=store.get(KEYS.verifications)||{};
    vs[form.email]={code,name:form.name,password:form.password,createdAt:Date.now()};
    store.set(KEYS.verifications,vs);

    const result = await sendVerificationEmail(form.email, form.name, code);
    setLoading(false);

    if(result.fallback){
      // EmailJS not configured — show code in the verify screen banner
      setPendingVerify({email:form.email, code, showFallback:true});
      showToast("Check the verification screen for your code","info");
    } else {
      // Real email sent successfully
      setPendingVerify({email:form.email, code, showFallback:false});
      showToast(`Verification email sent to ${form.email}!`,"success");
    }
  }

  function handleVerify(){
    setVerifyError("");
    const vs=store.get(KEYS.verifications)||{};
    const v=vs[pendingVerify.email];
    if(!v||v.code!==verifyInput){setVerifyError("Invalid code. Try again.");return;}
    const users=store.get(KEYS.users)||[];
    const newUser={
      id:generateId(),email:pendingVerify.email,name:v.name,
      password:v.password,role:"user",verified:true,
      avatar:"",bio:"",joinedAt:new Date().toISOString(),enrolledCourses:[]
    };
    users.push(newUser);
    store.set(KEYS.users,users);
    delete vs[pendingVerify.email];
    store.set(KEYS.verifications,vs);
    loginUser(newUser);onLogin(newUser,true);
  }

  if(pendingVerify){
    return(
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:20}}>
        <div className="card" style={{width:"100%",maxWidth:420,padding:"24px 20px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>{pendingVerify.showFallback?"🔑":"📧"}</div>
          <h2 style={{fontFamily:"'Google Sans',sans-serif",fontSize:22,fontWeight:500,marginBottom:8,color:"var(--text)"}}>
            {pendingVerify.showFallback?"Enter Verification Code":"Check your inbox"}
          </h2>

          {/* ── Real email sent ── */}
          {!pendingVerify.showFallback&&(
            <p style={{color:"var(--text2)",marginBottom:24,fontSize:14,lineHeight:1.7}}>
              We sent a 6-digit code to<br/>
              <strong style={{color:"var(--text)"}}>{pendingVerify.email}</strong>
            </p>
          )}

          {/* ── Fallback: EmailJS not configured ── */}
          {pendingVerify.showFallback&&(
            <div>
              <p style={{color:"var(--text2)",marginBottom:16,fontSize:14,lineHeight:1.7}}>
                EmailJS is not configured yet. Your verification code is shown below.
              </p>
              <div style={{
                background:"var(--amber-bg)",border:"1px solid #fce083",borderRadius:8,
                padding:"16px 20px",marginBottom:24,
              }}>
                <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--amber)",marginBottom:6}}>
                  ⚠ Dev Mode — Your OTP Code
                </div>
                <div style={{
                  fontFamily:"'Roboto Mono',monospace",fontSize:32,fontWeight:700,
                  letterSpacing:12,color:"var(--text)",userSelect:"all"
                }}>
                  {pendingVerify.code}
                </div>
                <div style={{fontSize:11,color:"var(--amber)",marginTop:6}}>
                  Configure EmailJS in the HTML to send real emails
                </div>
              </div>
            </div>
          )}

          {/* OTP Input */}
          <input
            className="input"
            placeholder="_ _ _ _ _ _"
            value={verifyInput}
            onChange={e=>setVerifyInput(e.target.value.replace(/\D/g,"").slice(0,6))}
            maxLength={6}
            style={{textAlign:"center",fontSize:"clamp(20px,6vw,28px)",letterSpacing:8,fontFamily:"'Roboto Mono',monospace",marginBottom:8}}
            onKeyDown={e=>e.key==="Enter"&&handleVerify()}
            autoFocus
          />
          {verifyError&&<p className="error-text" style={{marginBottom:8}}>{verifyError}</p>}

          <button className="btn btn-primary btn-lg" onClick={handleVerify} style={{width:"100%",justifyContent:"center",marginTop:8,marginBottom:8}}>
            Verify & Continue
          </button>

          {/* Resend */}
          <button
            className="btn btn-ghost btn-sm"
            style={{width:"100%",justifyContent:"center",marginBottom:8}}
            onClick={async()=>{
              const newCode=generateVerificationCode();
              const vs=store.get(KEYS.verifications)||{};
              const userName = vs[pendingVerify.email]?.name || "there";
              if(vs[pendingVerify.email]){vs[pendingVerify.email].code=newCode;store.set(KEYS.verifications,vs);}
              const r=await sendVerificationEmail(pendingVerify.email, userName, newCode);
              setPendingVerify(prev=>({...prev,code:newCode,showFallback:r.fallback}));
              showToast(r.fallback?"New code generated":"New code sent to your email","info");
            }}
          >
            Resend Code
          </button>

          <button className="btn btn-ghost btn-sm" onClick={()=>{setPendingVerify(null);setTab("login");}} style={{width:"100%",justifyContent:"center"}}>
            ← Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:20}}>
      <div className="card auth-card-max">
        {/* Logo */}
        <div style={{padding:"28px 24px 0",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:8}}>
            <div style={{width:40,height:40,background:"var(--primary)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:20,fontWeight:700}}>L</div>
            <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:22,fontWeight:700,color:"var(--primary)"}}>LearnHub</span>
          </div>
          <p style={{color:"var(--text2)",fontSize:13}}>Professional Learning Platform</p>
        </div>
        {/* Pending course context banner */}
        {pendingCourseId&&(()=>{
          const courses=store.get(KEYS.courses)||[];
          const c=courses.find(x=>x.id===pendingCourseId);
          return c?(<div style={{margin:"16px 24px 0",background:"var(--primary-light)",border:"1px solid #aecbfa",borderRadius:8,padding:"10px 14px",display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontSize:18,flexShrink:0}}>📚</span>
            <div style={{minWidth:0}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--primary)"}}>Enrolling in</div>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.title}</div>
            </div>
          </div>):null;
        })()}
        {/* Tabs */}
        <div style={{display:"flex",borderBottom:"1px solid var(--border)",margin:"24px 0 0"}}>
          {["login","signup"].map(t=>(
            <button key={t} onClick={()=>{setTab(t);setErrors({});}}
              style={{flex:1,padding:"12px 0",border:"none",background:"none",cursor:"pointer",fontFamily:"'Google Sans',sans-serif",
                fontSize:14,fontWeight:500,color:tab===t?"var(--primary)":"var(--text2)",
                borderBottom:tab===t?"2px solid var(--primary)":"2px solid transparent",transition:"all .15s"}}>
              {t==="login"?"Sign In":"Create Account"}
            </button>
          ))}
        </div>
        <div style={{padding:"20px 24px 28px"}}>
          {errors.global&&<div style={{background:"var(--red-bg)",border:"1px solid #f5c6c5",borderRadius:4,padding:"10px 14px",fontSize:13,color:"var(--red)",marginBottom:16}}>{errors.global}</div>}

          {tab==="signup"&&(
            <div className="form-group">
              <label className="label">Full Name</label>
              <input className={`input${errors.name?" error":""}`} placeholder="Your full name" value={form.name} onChange={e=>set("name",e.target.value)}/>
              {errors.name&&<p className="error-text">{errors.name}</p>}
            </div>
          )}
          <div className="form-group">
            <label className="label">Email Address</label>
            <input className={`input${errors.email?" error":""}`} type="email" placeholder="you@example.com" value={form.email} onChange={e=>set("email",e.target.value)} onKeyDown={e=>e.key==="Enter"&&(tab==="login"?handleLogin():handleSignup())}/>
            {errors.email&&<p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <div style={{position:"relative"}}>
              <input className={`input${errors.password?" error":""}`} type={showPass?"text":"password"} placeholder={tab==="signup"?"Min 8 chars, 1 uppercase, 1 number":"Password"} value={form.password} onChange={e=>set("password",e.target.value)} style={{paddingRight:40}} onKeyDown={e=>e.key==="Enter"&&(tab==="login"?handleLogin():handleSignup())}/>
              <button onClick={()=>setShowPass(!showPass)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text3)"}}>
                {showPass?<Icon.EyeOff/>:<Icon.Eye/>}
              </button>
            </div>
            {errors.password&&<p className="error-text">{errors.password}</p>}
          </div>
          {tab==="signup"&&(
            <div className="form-group">
              <label className="label">Confirm Password</label>
              <input className={`input${errors.confirmPassword?" error":""}`} type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e=>set("confirmPassword",e.target.value)}/>
              {errors.confirmPassword&&<p className="error-text">{errors.confirmPassword}</p>}
            </div>
          )}
          <button className="btn btn-primary btn-lg" onClick={tab==="login"?handleLogin:handleSignup} disabled={loading} style={{width:"100%",justifyContent:"center",marginTop:4}}>
            {loading?<span className="spinner"/>:tab==="login"?"Sign In":"Create Account"}
          </button>
          {tab==="login"&&(
            <p style={{textAlign:"center",fontSize:12,color:"var(--text3)",marginTop:16}}>
              Demo admin: admin@learnhub.dev / Admin@123
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
