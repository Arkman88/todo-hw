import React from 'react'
import './task.css'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  state = {
    isEditing: false,
    editText: this.props.description,
    errorMessage: '',
    showError: false,
  }

  onEditClick = () => {
    this.setState({
      isEditing: true,
      errorMessage: '',
      showError: false,
      editText: this.props.description,
    })
  }

  onTextChange = (e) => {
    this.setState({ editText: e.target.value, errorMessage: '', showError: false })
  }

  onSave = () => {
    const trimmedText = this.state.editText.trim()

    if (trimmedText.length > 0) {
      this.props.onEditItem(this.props.id, trimmedText)
      this.setState({ isEditing: false, errorMessage: '', showError: false })
    } else {
      this.setState({ errorMessage: 'The task cannot be empty!', showError: true })
    }
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.onSave()
    }
  }

  handleStart = () => {
    this.props.onStartTimer(this.props.id)
  }

  handlePause = () => {
    this.props.onPauseTimer(this.props.id)
  }

  render() {
    const { created, onDeleted, onToggleDone, done, timer } = this.props

    const { isEditing, editText, errorMessage, showError } = this.state
    const timeAgo = formatDistanceToNowStrict(new Date(created), { addSuffix: true })

    const timeRemaining = timer?.time || 0
    const timeDisplay = `${Math.floor(timeRemaining / 60)}m ${timeRemaining % 60}s`

    let classNames = done ? 'completed' : ''
    classNames += isEditing ? ' editing' : ''

    return (
      <div className={classNames}>
        <input className="toggle" checked={done} type="checkbox" onChange={onToggleDone} />
        {isEditing ? (
          <div>
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={this.onTextChange}
              onKeyDown={this.onKeyPress}
              size={editText.length}
            />
            {errorMessage && <span className={`error-message ${showError ? 'show' : ''}`}>{errorMessage}</span>}
          </div>
        ) : (
          <label>
            <span className="title" onClick={onToggleDone} onKeyDown={this.onKeyPress}>
              {editText}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={this.handleStart} />
              <button className="icon icon-pause" onClick={this.handlePause} />
              <span className="timer-time">{timeDisplay}</span>
            </span>
            <span className="created">{timeAgo}</span>
          </label>
        )}
        {!isEditing && (
          <>
            <button type="button" className="icon icon-edit" onClick={this.onEditClick} />
            <button type="button" className="icon icon-destroy" onClick={onDeleted} />
          </>
        )}
      </div>
    )
  }
}

Task.defaultProps = {
  done: false,
  description: '',
  created: Date.now(),
  timer: 0,
  onEditItem: () => {},
  onDeleted: () => {},
  onToggleDone: () => {},
}

Task.propTypes = {
  done: PropTypes.bool,
  description: PropTypes.string,
  created: PropTypes.string.isRequired,
  time: PropTypes.number,
  onEditItem: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  id: PropTypes.number.isRequired,
}
