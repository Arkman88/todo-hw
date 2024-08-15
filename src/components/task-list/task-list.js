import React from "react";
import Task from '../task/task'

const TaskList = ( {todos} ) => {

    const elements = todos.map(({ id, classNameInfo, ...itemProps }) => (
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