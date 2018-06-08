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
          return {todos: [newTodo, ...prevState.todos]}
        })
      })
  }

  deleteTodo = (todoId) => {
    apirequest({}, `${APIURL}/${todoId}`, 'delete')
      .then(() => {
        this.setState((prevState) => {
          return {todos: [...prevState.todos.filter(todo => todo._id !== todoId)]}
        })
      })
  }

  strikeTodo = (todoId, isCompleted) => {
    apirequest({completed: !isCompleted}, `${APIURL}/${todoId}`, 'put')
      .then(updatedTodo => {
        this.setState((prevState) => {
          return {todos: [
            ...prevState.todos.map(todo => {
              return todo._id === updatedTodo._id ? {...todo, completed: !todo.completed} : todo
            })
          ]}
        })
      })
  }

  render () {
    const todos = this.state.todos.map(({_id, ...others}) => {
      return <Todo key={_id} id={_id} {...others} deleteHandler={this.deleteTodo} strikeHandler={this.strikeTodo} />
    })

    return (
      <Fragment>
        <TodoForm clickHandler={this.addTodo} />
        <ul>{todos}</ul>
      </Fragment>
    )
  }
}
