import React from "react";
import './tasks-filter.css'

const TasksFilter = ({ filter, onFilterChange }) => {
    const filters = {
        all: 'All',
        active: 'Active',
        completed: 'Completed',
    };

    return (
        <ul className="filters">
            {Object.keys(filters).map((key) => (
                <li key={key}>
                    <button
                        className={filter === key ? 'selected' : ''}
                        onClick={() => onFilterChange(key)}
                    >
                        {filters[key]}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default TasksFilter;
