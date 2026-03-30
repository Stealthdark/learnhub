/* ═══════════════════════════════════════════════════════
   AUTH SCREENS
═══════════════════════════════════════════════════════ */
function AuthPage({onLogin,showToast,pendingCourseId}){
  const[tab,setTab]=useState("login");
  const[form,setForm]=useState({name:"",email:"",password:"",confirmPassword:""});
  const[errors,setErrors]=useState({});
  const[loading,setLoading]=useState(false);
  const[showPass,setShowPass]=useState(false);
  const[showConfirmPass,setShowConfirmPass]=useState(false);
  const[pendingVerify,setPendingVerify]=useState(null);// {email}
  const[verifyInput,setVerifyInput]=useState("");
  const[verifyError,setVerifyError]=useState("");
  const[pendingCourse,setPendingCourse]=useState(null);

  useEffect(()=>{
    if(!pendingCourseId)return;
    apiGetCourses().then(courses=>{
      const c=courses.find(x=>x.id===pendingCourseId);
      if(c)setPendingCourse(c);
    }).catch(()=>{});
  },[pendingCourseId]);

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

  async function handleLogin(){
    setLoading(true);setErrors({});
    try{
      const{token,user}=await apiLogin(form.email,form.password);
      loginUser(token);
      onLogin(user,false);
    }catch(err){
      setErrors({global:err.message||"Invalid email or password"});
    }
    setLoading(false);
  }

  async function handleSignup(){
    const e=validateSignup();
    if(Object.keys(e).length){setErrors(e);return;}
    setLoading(true);setErrors({});
    try{
      await apiSignup(form.name.trim(),form.email,form.password);
      setPendingVerify({email:form.email});
      showToast(`Verification code sent to ${form.email}`,"success");
    }catch(err){
      if(err.status===409)setErrors({email:"Email already registered"});
      else setErrors({global:err.message||"Signup failed"});
    }
    setLoading(false);
  }

  async function handleVerify(){
    setVerifyError("");
    if(!verifyInput||verifyInput.length!==6){setVerifyError("Enter the 6-digit code.");return;}
    setLoading(true);
    try{
      const{token,user}=await apiVerifyEmail(pendingVerify.email,verifyInput);
      loginUser(token);
      onLogin(user,true);
    }catch(err){
      setVerifyError(err.message||"Invalid code. Try again.");
    }
    setLoading(false);
  }

  if(pendingVerify){
    return(
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:20}}>
        <div className="card" style={{width:"100%",maxWidth:420,padding:"24px 20px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>📧</div>
          <h2 style={{fontFamily:"'Google Sans',sans-serif",fontSize:22,fontWeight:500,marginBottom:8,color:"var(--text)"}}>
            Check your inbox
          </h2>
          <p style={{color:"var(--text2)",marginBottom:24,fontSize:14,lineHeight:1.7}}>
            We sent a 6-digit code to<br/>
            <strong style={{color:"var(--text)"}}>{pendingVerify.email}</strong>
          </p>

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

          <button className="btn btn-primary btn-lg" onClick={handleVerify} disabled={loading} style={{width:"100%",justifyContent:"center",marginTop:8,marginBottom:8}}>
            {loading?<span className="spinner"/>:"Verify & Continue"}
          </button>

          <button
            className="btn btn-ghost btn-sm"
            style={{width:"100%",justifyContent:"center",marginBottom:8}}
            disabled={loading}
            onClick={async()=>{
              try{
                await apiResendOtp(pendingVerify.email);
                showToast("New code sent to your email","info");
              }catch(err){
                showToast(err.message||"Could not resend code","error");
              }
            }}
          >
            Resend Code
          </button>

          <button className="btn btn-ghost btn-sm" onClick={()=>{setPendingVerify(null);setVerifyInput("");setVerifyError("");setTab("login");}} style={{width:"100%",justifyContent:"center"}}>
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
            <img src="assets/og/logo/learnhub-logo.png" alt="LearnHub Logo" style={{width:"34px",height:"34px",borderRadius:"8px",objectFit:"cover",flexShrink:0}}/>
            <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:22,fontWeight:700,color:"var(--primary)"}}>LearnHub.Dev</span>
          </div>
          <p style={{color:"var(--text2)",fontSize:13}}>Professional E-Learning Platform</p>
        </div>
        {/* Pending course context banner */}
        {pendingCourse&&(
          <div style={{margin:"16px 24px 0",background:"var(--primary-light)",border:"1px solid #aecbfa",borderRadius:8,padding:"10px 14px",display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontSize:18,flexShrink:0}}>📚</span>
            <div style={{minWidth:0}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--primary)"}}>Enrolling in</div>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{pendingCourse.title}</div>
            </div>
          </div>
        )}
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
              <div style={{position:"relative"}}>
                <input className={`input${errors.confirmPassword?" error":""}`} type={showConfirmPass?"text":"password"} placeholder="Repeat password" value={form.confirmPassword} onChange={e=>set("confirmPassword",e.target.value)}/>
                <button onClick={()=>setShowConfirmPass(!showConfirmPass)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text3)"}}>
                  {showConfirmPass?<Icon.EyeOff/>:<Icon.Eye/>}
                </button>
              </div>
              {errors.confirmPassword&&<p className="error-text">{errors.confirmPassword}</p>}
            </div>
          )}
          <button className="btn btn-primary btn-lg" onClick={tab==="login"?handleLogin:handleSignup} disabled={loading} style={{width:"100%",justifyContent:"center",marginTop:4}}>
            {loading?<span className="spinner"/>:tab==="login"?"Sign In":"Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
