import React, { Component, Fragment } from 'react'
import Todo from './Todo'
import { handleErrors } from './helpers'
import TodoForm from './TodoForm'

const APIURL = '/api/todos'

export default class ToDoList extends Component {
  state = {todos: []}

  componentWillMount () {
    this.loadToDos()
  }

  loadToDos () {
    window.fetch(APIURL)
      .then(resp => {
        return handleErrors(resp)
      })
      .then(todos => this.setState({todos}))
  }

  render () {
    const todos = this.state.todos.map(({_id, ...others}) => <Todo key={_id} {...others} />)

    return (
      <Fragment>
        <ul>{todos}</ul>
        <TodoForm />
      </Fragment>
    )
  }
}
