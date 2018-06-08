import React from 'react'

const Todo = function ({name, completed, id, clickHandler}) {
  const handleClick = event => {
    console.log(id)
    return clickHandler(id)
  }

  return (
    <li onClick={handleClick} style={{textDecoration: completed ? 'line-through' : 'none'}}>
      {name}
    </li>
  )
}

export default Todo
