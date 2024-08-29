import React from 'react'
import './item-add-form.css'
import PropTypes from 'prop-types'

export default class AddForm extends React.Component {
  state = {
    text: '',
  }

  inputChange = (e) => {
    this.setState({
      text: e.target.value,
    })
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const { text } = this.state
      if (text.trim()) {
        this.props.onAdd(text)
        this.setState({ text: '' })
      }
    }
  }

  render() {
    return (
      <input
        className="new-todo"
        placeholder="Добавьте сюда задачу"
        value={this.state.text}
        onChange={this.inputChange}
        onKeyDown={this.onKeyPress}
      />
    )
  }
}

AddForm.defaultProps = {
  onAdd: () => {},
}

AddForm.propTypes = {
  onAdd: PropTypes.func,
}
