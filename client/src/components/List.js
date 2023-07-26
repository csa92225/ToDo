import React from 'react';

import "../App.css"
import {BsTrash} from "react-icons/bs"
import {BiEditAlt} from "react-icons/bi"
import {url} from "../App"
import axios from "axios";



const List = ({id, task, updateMode, setUpdateUI, completed}) => {

    const removeTask = () => {
        axios.delete(`${url}?id=${id}`).then((res)=>{
            console.log(res)
            setUpdateUI((prevState) => !prevState)
        })
    }

    const completeTask = () => {
        axios.post(`${url}/complete?id=${id}`).then((res)=>{
            console.log(res)
            setUpdateUI((prevState) => !prevState)
        })
    }

    const incompleteTask = () => {
        axios.post(`${url}/incomplete?id=${id}`).then((res)=>{
            console.log(res)
            setUpdateUI((prevState) => !prevState)
        })
    }

    return(
        <li className="list">
            {completed ? <strike>{task}</strike>: task}
            <div className="icon_holder">
                <BiEditAlt className="icon" onClick={() => {updateMode(id,task)}}/>
                <BsTrash className="icon" onClick={removeTask}/>
                <input type="checkbox" checked={completed} onChange={() => !completed ? completeTask(): incompleteTask()}/>
            </div>
        </li>
    )
}
export default List
