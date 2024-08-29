import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

function TaskList({ tasks, onDeleted, onToggleDone, onEditItem }) {
  const elements = tasks.map((task) => (
    <li key={task.id}>
      <Task
        id={task.id}
        description={task.description}
        created={task.created}
        done={task.done}
        onDeleted={() => onDeleted(task.id)}
        onToggleDone={() => onToggleDone(task.id)}
        onEditItem={onEditItem}
      />
    </li>
  ))

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditItem: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string,
      created: PropTypes.string.isRequired,
      done: PropTypes.bool,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditItem: PropTypes.func,
}

export default TaskList
