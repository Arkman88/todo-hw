import { useState } from 'react'
import './item-add-form.css'
import PropTypes from 'prop-types'

const AddForm = ({ onAdd = () => {} }) => {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const inputChange = (e) => {
    setText(e.target.value)
  }

  const onTimeChange = (e) => {
    const { name, value } = e.target
    if (name === 'min') setMin(value)
    if (name === 'sec') setSec(value)
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (text.trim()) {
        onAdd(text, (parseInt(min, 10) || 0) * 60 + (parseInt(sec, 10) || 0))
        setText('')
        setMin('')
        setSec('')
      }
    }
  }

  return (
    <div className="new-todo-form">
      <input
        className="new-todo"
        placeholder="Add task here..."
        value={text}
        onChange={inputChange}
        onKeyDown={onKeyPress}
      />
      <input
        type="number"
        name="min"
        className="new-todo-form__timer"
        value={min}
        onChange={onTimeChange}
        onKeyDown={onKeyPress}
        placeholder="min"
        min="0"
      />
      <input
        type="number"
        name="sec"
        className="new-todo-form__timer"
        value={sec}
        onChange={onTimeChange}
        onKeyDown={onKeyPress}
        placeholder="sec"
        min="0"
        max="59"
      />
    </div>
  )
}

AddForm.propTypes = {
  onAdd: PropTypes.func,
}

export default AddForm
