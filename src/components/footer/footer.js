import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

function Footer({ all, left, filter, onFilterChange, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {left} done, {all} left
      </span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  all: 0,
  left: 0,
  filter: 'all',
  onFilterChange: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  all: PropTypes.number,
  left: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func,
}

export default Footer
