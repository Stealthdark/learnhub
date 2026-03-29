function AvatarEl({user,size=32}){
  const initials=(user.name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const colors=["#1a73e8","#137333","#7c4dff","#007b83","#e37400","#c5221f"];
  const bg=colors[(user.email||"").charCodeAt(0)%colors.length];
  if(user.avatar){
    return<img src={user.avatar} alt={user.name} style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",border:"2px solid var(--border)",flexShrink:0}}/>;
  }
  return<div style={{width:size,height:size,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:Math.max(10,size*0.38),fontWeight:700,flexShrink:0}}>{initials}</div>;
}
