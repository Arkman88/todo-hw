import { useState, useRef, useEffect } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import './task.css'

const Task = ({
  id,
  description,
  created,
  done,
  time,
  onEditItem,
  onDeleted,
  onToggleDone,
  onStartTimer,
  onPauseTimer,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(description)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const onEditClick = () => {
    setIsEditing(true)
    setErrorMessage('')
    setEditText(description)
  }

  const onTextChange = (e) => {
    setEditText(e.target.value)
    setErrorMessage('')
  }

  const onSave = () => {
    const trimmedText = editText.trim()

    if (trimmedText.length > 0) {
      onEditItem(id, trimmedText)
      setIsEditing(false)
      setErrorMessage('')
    } else {
      setErrorMessage('Задача не может быть пустой!')
    }
  }

  const onCancelEdit = () => {
    setIsEditing(false)
    setEditText(description)
    setErrorMessage('')
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSave()
    } else if (e.key === 'Escape') {
      onCancelEdit()
    }
  }

  const onStartClick = () => {
    onStartTimer(id)
  }

  const onPauseClick = () => {
    onPauseTimer(id)
  }

  const timeAgo = formatDistanceToNowStrict(new Date(created), { addSuffix: true })

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
            ref={inputRef}
            value={editText}
            onChange={onTextChange}
            onKeyDown={onKeyPress}
            onBlur={onCancelEdit}
            size={editText.length}
          />
          {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
      ) : (
        <label>
          <span className="title" onClick={onToggleDone}>
            {description}
          </span>
          <span className="description">
            <button className="icon icon-play" onClick={onStartClick} />
            <button className="icon icon-pause" onClick={onPauseClick} />
            <span className="time-display">{time > 0 ? `${Math.floor(time / 60)}м ${time % 60}с` : `${0}м ${0}с`}</span>
          </span>
          <span className="created">{timeAgo}</span>
        </label>
      )}
      {!isEditing && (
        <>
          <button type="button" className="icon icon-edit" onClick={onEditClick} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </>
      )}
    </div>
  )
}

export default Task
