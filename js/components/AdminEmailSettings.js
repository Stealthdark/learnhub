/* ═══════════════════════════════════════════════════════
   ADMIN — EMAIL SETTINGS
═══════════════════════════════════════════════════════ */
function AdminEmailSettings({showToast}){
  const saved = getEmailJSConfig();
  const[form,setForm]=useState({
    serviceId:  saved.serviceId  || "service_00bfdtx",
    templateId: saved.templateId || "template_hhjc24d",
    publicKey:  saved.publicKey  || "yAdNYM8PucBh6xdeN",
  });
  const[errors,setErrors]=useState({});
  const[testing,setTesting]=useState(false);
  const[testEmail,setTestEmail]=useState("");
  const[showKeys,setShowKeys]=useState(false);
  const ready = !!(form.serviceId && form.templateId && form.publicKey);

  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  function handleSave(){
    const e={};
    if(!form.serviceId.trim())e.serviceId="Service ID is required";
    if(!form.templateId.trim())e.templateId="Template ID is required";
    if(!form.publicKey.trim())e.publicKey="Public Key is required";
    if(Object.keys(e).length){setErrors(e);return;}
    saveEmailJSConfig({serviceId:form.serviceId.trim(),templateId:form.templateId.trim(),publicKey:form.publicKey.trim()});
    setErrors({});
    showToast("EmailJS configuration saved & activated!","success");
  }

  function handleClear(){
    if(!confirm("Remove all EmailJS keys? Verification emails will fall back to dev mode."))return;
    localStorage.removeItem(EMAILJS_STORE_KEY);
    setForm({serviceId:"",templateId:"",publicKey:""});
    showToast("EmailJS config cleared","info");
  }

  async function handleTest(){
    if(!testEmail||!/\S+@\S+\.\S+/.test(testEmail)){showToast("Enter a valid email to test","error");return;}
    if(!ready){showToast("Save your keys first","error");return;}
    setTesting(true);
    // Save current form before testing
    saveEmailJSConfig({serviceId:form.serviceId.trim(),templateId:form.templateId.trim(),publicKey:form.publicKey.trim()});
    const testCode="999999";
    const r = await sendVerificationEmail(testEmail,"Test User",testCode);
    setTesting(false);
    if(r.sent){
      showToast(`✅ Test email sent to ${testEmail} — check your inbox!`,"success");
    } else {
      showToast(`❌ Failed: ${r.error||"Check your keys and template ID"}`, "error");
    }
  }

  const fieldStyle = (err) => ({
    width:"100%",padding:"10px 14px",border:`1px solid ${err?"var(--red)":"var(--border)"}`,
    borderRadius:4,fontSize:14,color:"var(--text)",background:"#fff",outline:"none",
    fontFamily:"'Roboto Mono',monospace",
  });

  return(
    <div className="page-pad" style={{maxWidth:700}}>
      <h1 className="h1" style={{marginBottom:4}}>Email Settings</h1>
      <p style={{color:"var(--text2)",marginBottom:24,fontSize:14}}>Configure EmailJS to send real verification emails to users.</p>

      {/* Status banner */}
      <div style={{
        background: ready ? "var(--green-bg)" : "var(--amber-bg)",
        border:`1px solid ${ready?"var(--green-border)":"#fce083"}`,
        borderRadius:8,padding:"14px 20px",marginBottom:28,
        display:"flex",alignItems:"center",gap:12
      }}>
        <span style={{fontSize:20}}>{ready?"✅":"⚠️"}</span>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:ready?"var(--green)":"var(--amber)"}}>
            {ready?"EmailJS is configured — real emails will be sent":"EmailJS not configured — dev mode active (OTP shown in UI)"}
          </div>
          <div style={{fontSize:12,color:"var(--text2)",marginTop:2}}>
            {ready
              ? "Verification emails will be triggered automatically on signup."
              : "Enter your EmailJS keys below and click Save to activate real email sending."}
          </div>
        </div>
      </div>

      {/* Keys form */}
      <div className="card" style={{padding:28,marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 style={{fontSize:16,fontWeight:500}}>EmailJS Credentials</h3>
          <button className="btn btn-ghost btn-sm" onClick={()=>setShowKeys(!showKeys)} style={{gap:6}}>
            {showKeys?"🙈 Hide Keys":"👁 Show Keys"}
          </button>
        </div>

        {/* Service ID */}
        <div className="form-group">
          <label className="label">Service ID
            <a href="https://dashboard.emailjs.com/admin" target="_blank" rel="noopener"
              style={{marginLeft:8,fontSize:11,color:"var(--primary)",textDecoration:"none",fontWeight:400}}>
              ↗ Find in EmailJS Dashboard → Email Services
            </a>
          </label>
          <input
            style={fieldStyle(errors.serviceId)}
            type={showKeys?"text":"password"}
            placeholder="service_xxxxxxxxx"
            value={form.serviceId}
            onChange={e=>set("serviceId",e.target.value)}
          />
          {errors.serviceId&&<p className="error-text">{errors.serviceId}</p>}
        </div>

        {/* Template ID */}
        <div className="form-group">
          <label className="label">Template ID
            <a href="https://dashboard.emailjs.com/admin/templates" target="_blank" rel="noopener"
              style={{marginLeft:8,fontSize:11,color:"var(--primary)",textDecoration:"none",fontWeight:400}}>
              ↗ Find in EmailJS Dashboard → Email Templates
            </a>
          </label>
          <input
            style={fieldStyle(errors.templateId)}
            type={showKeys?"text":"password"}
            placeholder="template_xxxxxxxxx"
            value={form.templateId}
            onChange={e=>set("templateId",e.target.value)}
          />
          {errors.templateId&&<p className="error-text">{errors.templateId}</p>}
        </div>

        {/* Public Key */}
        <div className="form-group">
          <label className="label">Public Key
            <a href="https://dashboard.emailjs.com/admin/account" target="_blank" rel="noopener"
              style={{marginLeft:8,fontSize:11,color:"var(--primary)",textDecoration:"none",fontWeight:400}}>
              ↗ Find in EmailJS Dashboard → Account → General
            </a>
          </label>
          <input
            style={fieldStyle(errors.publicKey)}
            type={showKeys?"text":"password"}
            placeholder="xxxxxxxxxxxxxxxxxxxx"
            value={form.publicKey}
            onChange={e=>set("publicKey",e.target.value)}
          />
          {errors.publicKey&&<p className="error-text">{errors.publicKey}</p>}
        </div>

        <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:8}}>
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Save & Activate
          </button>
          {ready&&(
            <button className="btn btn-ghost" onClick={handleClear} style={{color:"var(--red)"}}>
              🗑 Clear Keys
            </button>
          )}
        </div>
      </div>

      {/* Test email */}
      <div className="card" style={{padding:28,marginBottom:20}}>
        <h3 style={{fontSize:16,fontWeight:500,marginBottom:6}}>Send Test Email</h3>
        <p style={{fontSize:13,color:"var(--text2)",marginBottom:16}}>
          Send a test verification email with code <strong style={{fontFamily:"'Roboto Mono',monospace"}}>999999</strong> to verify your setup is working.
        </p>
        <div className="test-email-row">
          <input
            className="input"
            type="email"
            placeholder="your@email.com"
            value={testEmail}
            onChange={e=>setTestEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleTest()}
            style={{flex:1}}
          />
          <button className="btn btn-primary send-test-btn" onClick={handleTest} disabled={testing||!ready}>
            {testing?<><span className="spinner"/>Sending…</>:"📨 Send Test"}
          </button>
        </div>
        {!ready&&<p style={{fontSize:12,color:"var(--text3)",marginTop:8}}>Save your keys above before sending a test.</p>}
      </div>

      {/* Template reference */}
      <div className="card" style={{padding:28}}>
        <h3 style={{fontSize:16,fontWeight:500,marginBottom:12}}>Required Template Variables</h3>
        <p style={{fontSize:13,color:"var(--text2)",marginBottom:16}}>
          Your EmailJS template must use these exact variable names:
        </p>
        <table className="table" style={{marginBottom:16}}>
          <thead><tr><th>Variable</th><th>Example value</th><th>Where to set</th></tr></thead>
          <tbody>
            {[
              ["{{to_name}}","Harshit","Body — recipient's name"],
              ["{{to_email}}","user@example.com","\"To Email\" field in template settings"],
              ["{{otp_code}}","847293","Body — the 6-digit verification code"],
              ["{{app_name}}","LearnHub","Body — platform name"],
            ].map(([v,ex,where])=>(
              <tr key={v}>
                <td><code style={{fontFamily:"'Roboto Mono',monospace",fontSize:13,background:"var(--bg)",padding:"2px 6px",borderRadius:3}}>{v}</code></td>
                <td style={{fontSize:13,color:"var(--text2)"}}>{ex}</td>
                <td style={{fontSize:13,color:"var(--text2)"}}>{where}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{background:"var(--primary-light)",border:"1px solid #aecbfa",borderRadius:6,padding:"12px 16px",fontSize:13,color:"var(--primary)"}}>
          <strong>📋 Pro tip:</strong> In the EmailJS template editor, set the <strong>To Email</strong> field
          to <code style={{fontFamily:"'Roboto Mono',monospace"}}>{"{{to_email}}"}</code> — not a fixed address.
          Otherwise all emails will go to your own inbox instead of the user's.
        </div>
      </div>
    </div>
  );
}
