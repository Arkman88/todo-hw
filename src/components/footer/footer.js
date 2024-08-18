import React from "react";
import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

const Footer = ({all, left, filter, onFilterChange, clearCompleted}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{left} готово, {all} осталось</span>
            <TasksFilter filter={filter} onFilterChange={onFilterChange} />
            <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
                </button>
        </footer>
    )
}

export default Footer