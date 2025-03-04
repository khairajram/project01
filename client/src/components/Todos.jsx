import { useState,useEffect } from 'react'

import axios from "axios";

export default function Todos({todos,setTodos}) {

  const [title,setTitle] = useState("");



  async function addTodo(){
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/addTodo", {
        title
      },{
        headers: {
          token
        }
      }
    );
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  return (
    <>
      <div
        style={{
          height: "auto",
          backgroundColor: "rgb(204, 172, 172)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "150px 200px",
          padding : "10px",
          borderRadius:"10px"
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(173, 152, 152)",
            marginBottom: "20px",
            padding: "10px 5px",
            width: "80%", 
            textAlign: "center",
            borderRadius:"10px"
          }}
        >
          <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter the todo' style={{
            borderRadius:"5px",
            border:"0px",
            backgroundColor:"rgb(214, 199, 199)",
            height:"30px",
            textAlign: "center",
            width: "60%",
          }}/>
          <button onClick={addTodo} style={{
            borderRadius:"5px",
            border:"0px",
            height:"30px",
            backgroundColor:"rgb(214, 199, 199)",
            marginLeft:"10px",
            width: "19%",
          }}>add</button>
        </div>
        <div style={{marginBottom:"10px"}}>
          your todos
        </div>
        <div
          style={{
            backgroundColor: "rgb(182, 156, 156)",
            width: "80%",
            textAlign: "center",
            padding: "25px",
            borderRadius:"10px"
          }}
        >
          <div>
            <span>completed tasks</span>
            <div style={{textAlign:"left"}}>
              <TodoList todos={todos} setTodos={setTodos} ></TodoList>
            </div>
          </div>

          <div>
            <span style={{color:"rgb(209, 58, 58)"}}>incomplete tasks</span>
            <div style={{textAlign:"left"}}>
              <TodoListInc todos={todos} setTodos={setTodos}  ></TodoListInc>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

function TodoListInc({todos,setTodos}) {

  async function deleteTodo(id){
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:3000/todoDelete/${id}`, 
        {
          headers: {
            token
          }
        });
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  async function markeDone({id}){
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:3000/todoUpdate`, {
        id
      },{
        headers: {
          token: token
        }
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  const TodoCom = (todos.length > 0) ? todos.map(todo =>
        !todo.done ? <List key={todo._id} title={todo.title} id={todo._id} /> : null
    ) : <div style={{ alignItems: "center", display: "flex",     justifyContent: "center" }}>
      All todo done
    </div>

  function List({title,id}){
    return <>
      <li style={{ 
        display: "list-item", 
        padding: "10px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          width: "100%"
        }}>
          <span style={{
            flexGrow: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}>
            {title}
          </span>
          <div style={{ display: "flex", gap: "5px" }}>
            <input type="checkbox" onChange={() => markeDone({id})}/>
            <button onClick={() => deleteTodo(id)}>Delete</button>
          </div>
        </div>
      </li>
    </>
  }

  
  return (
    <ol style={{ padding: 0, margin: 0 }}>
      {TodoCom}
    </ol>
  );
}



function TodoList({todos,setTodos}) {

  async function deleteTodo(id){
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:3000/todoDelete/${id}`, {
        headers: {
          token: token
        }
      }); 
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  const TodoCom = (todos.length > 0) ? todos.map(todo =>
      todo.done ? <List key={todo._id} title={todo.title} id={todo._id} /> : null
  ) : <div style={{ alignItems: "center", display: "flex",     justifyContent: "center" }}>
  No todos found
</div>

  function List({title,id}){
    return <>
      <li style={{ 
        display: "list-item", 
        padding: "10px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          width: "100%"
        }}>
          <span style={{
            flexGrow: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}>
            {title}
          </span>
          <div style={{ display: "flex", gap: "5px" }}>
            <button onClick={() => deleteTodo(id)}>Delete</button>
          </div>
        </div>
      </li>
    </>
  }

  
  return (
    <ol style={{ padding: 0, margin: 0 }}>
        {TodoCom}
    </ol>
  );
}