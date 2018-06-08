import React, { Component, Fragment } from 'react'

export default class TodoForm extends Component {
  render () {
    return (
      <Fragment>
        <input type='text' />
        <button> Add Todo</button>
      </Fragment>
    )
  }
}
