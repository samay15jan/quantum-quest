import React, { useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai"
import { BsBell, BsBellSlash } from "react-icons/bs"
import VanillaTilt from "vanilla-tilt";


const Task = ({task, onDelete, onToggle}) => {
  const tiltRef = useRef(null);
  useEffect(() => {
    if(tiltRef.current) {
      VanillaTilt.init(tiltRef.current,{
      max: 5,
      speed: 200,
      glare: true,
      'max-glare': 0.1,
    });
  }},[]);
  return (
    <div className='task'  ref={tiltRef}>
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
        {task.imageUrl && <img className="rounded-xl " ref={tiltRef} src={task.imageUrl}/>}
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
