import React, {useState, useEffect} from "react";
import List from './components/List'
import axios from "axios";
export const url = "http://localhost:4000/todos"

function App(){
  const [ input, setInput ] = useState("")
  const [ tasks, setTasks ] = useState([])
  const [ updateUI, setUpdateUI ] = useState(false)
  const [ updateId, setUpdateId ] = useState(null)

  useEffect(()=> {
    axios.get(url).then(res => {
      console.log(res)
      setTasks(res.data)
    })
  },[updateUI])

  const addTask = () => {
    axios.post(url, {task:input}).then((res)=>{
      console.log(res.data)
      setInput("")
      setUpdateUI((prevState) => !prevState)
    })
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
    <div className="App">
      <div className="container">
        <h1 className="title">Todo App</h1>
        <div className="input_holder">
          <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
          <button type="submit" onClick={updateId ? updateTask : addTask}>{updateId ? "Update Task" : "Add Task"}</button>
        </div>
        <ul>
          {tasks.map((task) => (
          <List 
            key={task.ID} 
            id={task.ID} 
            task={task.TASK} 
            setUpdateUI={setUpdateUI}
            updateMode={updateMode} />))
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
