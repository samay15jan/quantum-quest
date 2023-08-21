import React from 'react'
import Button from './Button'

const Main = ( { onAdd, showAdd } ) => {
  return (
    <div>
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </div>
  )
}

export default Main