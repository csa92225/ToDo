import React from 'react'

import {BsTrash} from "react-icons/bs"
import {BiEditAlt} from "react-icons/bi"
import {url} from "../App"
import axios from "axios";

const List = ({id, task, updateMode, setUpdateUI}) => {

    const removeTask = () => {
        axios.delete(`${url}?id=${id}`).then((res)=>{
            console.log(res)
            setUpdateUI((prevState) => !prevState)
        })
    }

    return(
        <li>
            {task}
            <div className="icon_holder">
                <BiEditAlt className="icon" onClick={() => {updateMode(id,task)}}/>
                <BsTrash className="icon" onClick={removeTask}/>
            </div>
        </li>
    )
}
export default List