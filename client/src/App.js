import React, { Component } from 'react'
import './App.css'
import ToDoList from './ToDoList'

export default class App extends Component {
  componentWillMount () {
    window.fetch(':8081/api/todos')
      .then(data => data.json())
      .then(todos => this.setState({todos}))
  }

  render () {
    return (
      <div className='App'>
        <ToDoList />
      </div>
    )
  }
}
