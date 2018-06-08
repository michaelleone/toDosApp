import React, { Component, Fragment } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import { handleErrors, apirequest } from '../../helpers'

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
    apirequest({name: todoName}, APIURL, 'post')
      .then(newTodo => {
        this.setState((prevState) => {
          return {todos: [...prevState.todos, newTodo]}
        })
      })
  }

  deleteTodo = (todoId) => {
    apirequest({}, `${APIURL}/${todoId}`, 'delete')
      .then(newTodo => {
        this.setState((prevState) => {
          return {todos: [...prevState.todos.filter(todo => todo._id !== todoId)]}
        })
      })
  }

  render () {
    const todos = this.state.todos.map(({_id, ...others}) => {
      return <Todo key={_id} id={_id} {...others} clickHandler={this.deleteTodo} />
    })

    return (
      <Fragment>
        <ul>{todos}</ul>
        <TodoForm clickHandler={this.addTodo} />
      </Fragment>
    )
  }
}
