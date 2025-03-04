import { useState,useEffect } from 'react'

import axios from "axios";

export default function SignPage({isSignIn,setSignIn,button,setButton,setTodos}) {

  function SignInText() {
    return (
      <span>
        please{" "}
        <button
          onClick={() => {
            setButton(true);
          }}
          style={{
            backgroundColor: "transparent",
            border: "0px",
            fontSize: "35px",
            color: "rgb(59, 105, 169)",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          signin/signup
        </button>{" "}
        to access your todo
      </span>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "200px 0px",
      fontSize: "40px"
    }}>
      {button  ? <SignInUp setTodos={setTodos} setSignIn={setSignIn}/> : <SignInText />}
    </div>
  );
}


function SignInUp({setSignIn,setTodos}){
  const [buttonNav,setButtonNav] = useState("signin");

  function SignInDiv(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
      try {
        const response = await axios.post("http://localhost:3000/signin", {
          email,
          password
        });
        localStorage.setItem("token",response.data.token);
        setTodos(response.data.todos);
        setSignIn(true);

        localStorage.setItem("token", response.data.token);

        // axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;



      } catch (error) {
        console.error("Error:", error);
      }
    };

    return <>
      <div style={{
        display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
        gap:"20px"
      }}>
        <div>
          <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} id='email' />
        </div>
        <div>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} id='password' />
        </div>
        <div>
          <button onClick={handleSignIn} style={{height:"48px",width:"330px",borderRadius:"7px",border:"0px",paddingLeft:"10px",fontSize:"15px",backgroundColor:"#0866ff",color:"rgb(255, 255, 255)",fontSize:"20px",cursor:"pointer"}}>Log in</button>
        </div>
      </div>
    </>
  }

  function SignUpDiv(){    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");

    const handleSignUp = async () => {
      try {
        const response = await axios.post("http://localhost:3000/signup", {
          email,
          password,
          userId
        });
        alert("signed up complete");
        setButtonNav("signin");
      } catch (error) {
        alert("Error in signing up");
        console.error("Error :", error);
      }
    };

    return <>
      <div style={{
        display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
        gap:"20px"
      }}>
        <div>
          <input onChange={(e) => setEmail(e.target.value)} id='signUpEmail' type="text" placeholder="Email" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} />
        </div>
        <div>
          <input onChange={(e) => setPassword(e.target.value)} id='signUpPassword' type="text" placeholder="Password" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} />
        </div>
        <div>
          <input onChange={(e) => setUserId(e.target.value)} id='userId' type="text" placeholder="User Id" style={{height:"48px",width:"330px",borderRadius:"7px",paddingLeft:"10px",fontSize:"15px"}} />
        </div>
        <div>
          <button onClick={handleSignUp} style={{height:"48px",width:"330px",borderRadius:"7px",border:"0px",paddingLeft:"10px",fontSize:"15px",backgroundColor:"#0866ff",color:"rgb(255, 255, 255)",fontSize:"20px",cursor:"pointer"}}>Sign Up</button>
        </div>
      </div>
    </>
  }

  return <>
    <div 
    style={{
      backgroundColor: "rgb(255, 255, 255)",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding : "10px",
      borderRadius:"10px",
      height: buttonNav === "signin" ? "300px" : "380px",
      width:"360px"
    }}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
        <div style={{width:"50%"}}>
          <button onClick={() => setButtonNav("signin")}
           style={{
            height: "40px",
            width: "100%",
            fontSize: "20px",
            backgroundColor: buttonNav === "signin" ? "rgb(255, 255, 255)" : "rgb(218, 202, 202)",
            border: "none", 
            borderTop: buttonNav === "signin" ? "2px solid rgb(15, 157, 88)" : "2px solid transparent",
            cursor: "pointer", 
            transition: "0.3s ease-in-out"
        }} 
          >Sign In</button>
      </div >
      <div style={{width:"50%"}}>
          <button style={{
            height: "40px",
            width: "100%",
            fontSize: "20px",
            backgroundColor: buttonNav === "signup" ? "rgb(255, 255, 255)" : "rgb(218, 202, 202)",
            border: "none", 
            borderTop: buttonNav === "signup" ? "2px solid rgb(15, 157, 88)" : "2px solid transparent",
            cursor: "pointer", 
            transition: "0.3s ease-in-out"
        }} onClick={() => setButtonNav("signup")}
        >Sign Up</button>
        </div>
      </div>
      <div>
        {(buttonNav === "signin") ? <SignInDiv/> : <SignUpDiv/>}
      
      </div>
      
    </div>
  </>
}
