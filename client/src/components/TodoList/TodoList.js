import React, { Component, Fragment } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import { handleErrors, postJson } from '../../helpers'

const APIURL = '/api/todos'

export default class ToDoList extends Component {
  state = {todos: []}

  componentWillMount () {
    this.loadToDos()
  }

  loadToDos () {
    window.fetch(APIURL)
      .then(resp => handleErrors(resp))
      .then(todos => this.setState({todos}))
  }

  addTodo = (todoName) => {
    postJson({name: todoName}, APIURL)
      .then(newTodo => {
        this.setState((prevState) => {
          return {todos: [...prevState.todos, newTodo]}
        })
      })
  }

  render () {
    const todos = this.state.todos.map(({_id, ...others}) => {
      return <Todo key={_id} {...others} />
    })

    return (
      <Fragment>
        <ul>{todos}</ul>
        <TodoForm clickHandler={this.addTodo} />
      </Fragment>
    )
  }
}
