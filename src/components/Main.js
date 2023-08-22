import React from 'react'
import Button from './Button'
import { MdOutlineAddBox } from 'react-icons/md'

const Main = ( { onAdd, showAdd } ) => {
  return (
    <div>
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? <MdOutlineAddBox/> : 'Add'} onClick={onAdd}/>
    </div>
  )
}

export default Main