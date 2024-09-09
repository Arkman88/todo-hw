import React from 'react'
import './item-add-form.css'
import PropTypes from 'prop-types'

export default class AddForm extends React.Component {
  state = {
    text: '',
    min: '',
    sec: '',
  }

  inputChange = (e) => {
    this.setState({
      text: e.target.value,
    })
  }

  onTimeChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const { text, min, sec } = this.state
      if (text.trim()) {
        this.props.onAdd(text, (parseInt(min, 10) || 0) * 60 + (parseInt(sec, 10) || 0))
        this.setState({ text: '', min: '', sec: '' })
      }
    }
  }

  render() {
    const { text, min, sec } = this.state

    return (
      <div className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Add task here..."
          value={text}
          onChange={this.inputChange}
          onKeyDown={this.onKeyPress}
        />
        <input
          type="number"
          name="min"
          className="new-todo-form__timer"
          value={min}
          onChange={this.onTimeChange}
          onKeyDown={this.onKeyPress}
          placeholder="min"
          min="0"
        />
        <input
          type="number"
          name="sec"
          className="new-todo-form__timer"
          value={sec}
          onChange={this.onTimeChange}
          onKeyDown={this.onKeyPress}
          placeholder="sec"
          min="0"
          max="59"
        />
      </div>
    )
  }
}

AddForm.defaultProps = {
  onAdd: () => {},
}

AddForm.propTypes = {
  onAdd: PropTypes.func,
}
