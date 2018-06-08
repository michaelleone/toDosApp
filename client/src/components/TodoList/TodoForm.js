import React, { Component, Fragment } from 'react'

export default class TodoForm extends Component {
  state={
    inputValue: 'None yet!'
  }

  handleChange = event => {
    this.setState({inputValue: event.target.value})
  }

  handleClick = event => {
    this.props.clickHandler(this.state.inputValue)
  }

  render () {
    return (
      <Fragment>
        <input type='text' value={this.state.inputValue} onChange={this.handleChange} />
        <button onClick={this.handleClick}> Add Todo </button>
      </Fragment>
    )
  }
}
