import React from 'react'

const SelectTask = ({ text, CaughtClick }) => {
  return (
    <div>
        <button className='border shadow-md text-xl px-2 py-1 mx-1 text-slate-600 hover:text-black bg-slate-100 rounded-md hover:bg-gray-300' onClick={CaughtClick}>{text}</button>
    </div>
  )
}

export default SelectTask