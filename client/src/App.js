import React, { Component } from 'react'
import './App.css'
import ToDoList from './TodoList'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <ToDoList />
      </div>
    )
  }
}
