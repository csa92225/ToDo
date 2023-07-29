import React, {useState, useEffect} from "react";
import List from './components/List'
import "./App.css"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';  

export const url = "http://localhost:4000/todos"

function App(){
  const [ input, setInput ] = useState("")
  const [ tasks, setTasks ] = useState([])
  const [ updateUI, setUpdateUI ] = useState(false)
  const [ updateId, setUpdateId ] = useState(null)

  useEffect(()=> {
    axios.get(url).then(res => {
      console.log(res)
      res.data.sort(function(a,b) {return (a.COMPLETED > b.COMPLETED) ? 1 : ((b.COMPLETED > a.COMPLETED) ? -1 : 0);} );
      setTasks(res.data)
    })
  },[updateUI])

  const addTask = () => {
    if (input !== ""){
      axios.post(url, {task:input}).then((res)=>{
          console.log(res.data)
          setInput("")
          setUpdateUI((prevState) => !prevState)
        })
    }
  }

  const updateMode = (id, task) => {
    console.log(task)
    setInput(task)
    setUpdateId(id)
  }

  const updateTask = () => {
    console.log(tasks)
    axios.post(`${url}/update?id=${updateId}`, {task:input}).then((res) => {
      console.log(res.data)
      setUpdateUI((prevState) => !prevState)
      setUpdateId(null)
      setInput("")
    })
  }

  return(
    <div class="p-3">
      <h1 class="header">Todo App</h1><br/>
        <div class="form-inline w-34">
          <input class="form-control input-md"
              placeholder="Enter a task to do"
              value={input} 
              onChange={(e)=>setInput(e.target.value)}/>
          <button class="big-button" onClick={updateId ? updateTask : addTask}>{updateId ? "Update" : "Add"}</button>
        </div><br/>
        <ul class="list-group" >
          {tasks.map((task) => (
          <List  
            id={task.ID} 
            task={task.TASK} 
            completed={task.COMPLETED}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
         />))
          }
        </ul>
    </div>
  )
}

export default App;
