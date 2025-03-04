import { useState,useEffect } from 'react'
import axios from "axios";
import HeaderBar from './components/HeaderBar'
import SignPage from './components/SignPage'
import Todos from './components/Todos'

function App() {
  const token = localStorage.getItem("token");

  const [isSignIn, setSignIn] = useState(!!token);
  const [todos, setTodos] = useState([]);
  const [ button,setButton ] = useState(isSignIn);

  
  useEffect(() => {
    const fetchTodos = async () => {
      
      try {
        const response = await axios.get("http://localhost:3000/todos", {
          headers: {
            token: token
          },
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    if(isSignIn)
      fetchTodos();
  }, []);
  
  
  return (
    <>
      <HeaderBar button={button} setButton={setButton} setSignIn={setSignIn}/>
      {isSignIn && <Todos todos={todos} setTodos={setTodos} />}
      {!isSignIn && <SignPage setTodos={setTodos}  isSignIn={isSignIn} setSignIn={setSignIn} button={button} setButton={setButton}/>}
    </>
  );
}


export default App
