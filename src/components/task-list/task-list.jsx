import PropTypes from 'prop-types'
import Task from '../task/task'
import './task-list.css'

function TaskList({ tasks, timers, onDeleted, onToggleDone, onEditItem, onStartTimer, onPauseTimer }) {
  const elements = tasks.map((task) => {
    const taskTimer = timers[task.id] || { time: task.time }
    return (
      <li key={task.id}>
        <Task
          id={task.id}
          description={task.description}
          created={task.created}
          time={task.time}
          timer={taskTimer}
          done={task.done}
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

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditItem: () => {},
  onStartTimer: () => {},
  onPauseTimer: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string,
      created: PropTypes.string.isRequired,
      time: PropTypes.number,
      done: PropTypes.bool,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditItem: PropTypes.func,
  onStartTimer: PropTypes.func,
  onPauseTimer: PropTypes.func,
}

export default TaskList
