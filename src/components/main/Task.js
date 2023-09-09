import React from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { BsBell, BsBellSlash } from "react-icons/bs"

const Task = ({task, onDelete, onToggle}) => {
  return (
    <div className='task'>
      <div className="flex">
        {task.text}
      </div>
      <p className="text-sm font-light">{task.note}</p>

      <div className='mx-1 p-1 flex justify-between'>
        <button style={{color:'rgb(224, 125, 142)', cursor:'pointer'}} onClick={() => onDelete(task.id, task.taskLocation)}>
          <div className="text-xl">
            <AiOutlineDelete />
          </div>
        </button>
        <div className="w-56 pt-1">
        {task.imageUrl && <img className="rounded-xl" src={task.imageUrl}/>}
      </div>
        <button style={{color:'rgb(224, 125, 142)', cursor:'pointer'}} onClick={() => onToggle(task.id, task.taskLocation)}>
          <div className="text-xl">
            {task.reminder ? <BsBell /> : <BsBellSlash />}
          </div>
        </button>
        </div>
    </div>
  )
}

export default Task