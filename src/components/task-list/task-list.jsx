import PropTypes from 'prop-types'
import Task from '../task/task'
import './task-list.css'

function TaskList({ tasks, onDeleted, onToggleDone, onEditItem, onStartTimer, onPauseTimer }) {
  const elements = tasks.map((task) => {
    return (
      <li key={task.id}>
        <Task
          id={task.id}
          description={task.description}
          created={task.created}
          done={task.done}
          time={task.time}
          onDeleted={() => onDeleted(task.id)}
          onToggleDone={() => onToggleDone(task.id)}
          onEditItem={onEditItem}
          onStartTimer={onStartTimer}
          onPauseTimer={onPauseTimer}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string,
      created: PropTypes.string.isRequired,
      done: PropTypes.bool,
      time: PropTypes.number,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func,
  onPauseTimer: PropTypes.func,
}

export default TaskList
