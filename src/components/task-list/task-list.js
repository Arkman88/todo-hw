import React from "react";
import Task from '../task/task'
import './task-list.css'

const TaskList = ( {tasks} ) => {

    const elements = tasks.map(({ id, classNameInfo, ...itemProps }) => (
        <li key={id} className={classNameInfo}>
            <Task {...itemProps} />
        </li>
    ));

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    )
}

export default TaskList;