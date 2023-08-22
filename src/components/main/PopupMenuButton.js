import React from 'react'
import Button from './Button'

const Main = ( { onAdd, showAdd } ) => {
  return (
    <div>
      <Button onClick={onAdd} text={showAdd ? <div className='bg-white rounded-full'><i className="fa-solid fa-circle-xmark fa-2xl text-red-600"></i></div> : <div className='bg-white rounded-full'> <i className="fa-solid fa-circle-plus fa-2xl text-green-600"></i> </div>}/>
    </div>
  )
}

export default Main