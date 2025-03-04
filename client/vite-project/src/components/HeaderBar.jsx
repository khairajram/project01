import { useState,useEffect } from 'react'


export default function HeaderBar({button,setButton,setSignIn}){
  
  return <>
    <div style={{backgroundColor : "#199199",height : "50px",boxShadow: "0px 10px 8px 1px #888888" ,display : "flex",justifyContent:"space-between"}}>
      <div style={{marginTop: "10px",marginLeft: "10px"}}>
        <a href="/" style={{textDecoration: "none"}}>
          <span style={{fontSize : "30px",color:"white"}}>TodO</span>
        </a>
      </div>
      <div>
       {!button && <SignInButton setButton={setButton}></SignInButton>}
       {button && <LogOutButton setButton={setButton} setSignIn={setSignIn}></LogOutButton>}
      </div>
    </div>
  </>
}


function SignInButton({setButton}){

  return <>
  <button onClick={() => {
              setButton(true)
              }} style={{backgroundColor:"#273239",height:"30px",width:"100px",color:"#fff",fontSize:"25px",margin:"9px 40px",paddingLeft:"10px",paddingTop:"1px",borderRadius:"7px" , cursor:"pointer", border:"0px"}}>
      SignIn
  </button>
    
  </>
}

function LogOutButton({setButton,setSignIn}){

  function logout(){
    setButton(false);
    setSignIn(false);
    localStorage.setItem("token","");
  }

  return <>
  <button onClick={logout} style={{backgroundColor:"#273239",height:"30px",width:"100px",color:"#fff",fontSize:"25px",margin:"9px 40px",paddingLeft:"10px",paddingTop:"1px",borderRadius:"7px" , cursor:"pointer", border:"0px"}}>
      LogOut
  </button>
    
  </>
}