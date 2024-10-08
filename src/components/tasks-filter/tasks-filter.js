import './tasks-filter.css'
import PropTypes from 'prop-types'

function TasksFilter({ filter, onFilterChange }) {
  const filters = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  }

  return (
    <ul className="filters">
      {Object.keys(filters).map((key) => (
        <li key={key}>
          <button type="button" className={filter === key ? 'selected' : ''} onClick={() => onFilterChange(key)}>
            {filters[key]}
          </button>
        </li>
      ))}
    </ul>
  )
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}

export default TasksFilter
