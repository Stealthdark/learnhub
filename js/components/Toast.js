/* ═══════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════ */
let toastTimeout;
function Toast({toast,onClose}){
  useEffect(()=>{
    toastTimeout=setTimeout(onClose,3500);
    return()=>clearTimeout(toastTimeout);
  },[toast]);
  if(!toast)return null;
  return<div className={`toast toast-${toast.type}`}>{toast.msg}</div>;
}
