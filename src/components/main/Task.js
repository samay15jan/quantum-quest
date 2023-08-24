import React from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { BsBell, BsBellSlash } from "react-icons/bs"

const Task = ({task, onDelete, onToggle}) => {
  return (
    <div className='task'>
      <h3>
        {task.text}
        <button style={{color:'red', cursor:'pointer'}} onClick={() => onDelete(task.id)}>
          <dir className="text-2xl">
            <AiOutlineDelete />
          </dir>
        <button className="" onClick={() => onToggle(task.id)}>
        </button>
          <div className="text-2xl">
            {task.reminder ? <BsBell /> : <BsBellSlash />}
          </div>
        </button>
      </h3>

      <p>{task.note}</p>

      <div className="w-64 ">
        {task.imageUrl && <img src={task.imageUrl}/>}
      </div>
    </div>
  )
}

export default Task