import React from 'react'

const Todo = function ({name, completed, id, deleteHandler, strikeHandler}) {
  const handleClick = event => {
    return deleteHandler(id)
  }

  const handleStrike = event => {
    return strikeHandler(id, completed)
  }

  return (
    <li style={{textDecoration: completed ? 'line-through' : 'none'}}>
      <span onClick={handleStrike}>
        {name}
      </span>
      <span onClick={handleClick} >
        &nbsp; <a href='#'>[x]</a>
      </span>
    </li>
  )
}

export default Todo
