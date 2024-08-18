import React from "react";
import Task from '../task/task';
import './task-list.css';

const TaskList = ( {tasks, onDeleted} ) => {

    const elements = tasks.map(task => (
        <li key={task.id}>
            <Task 
                description={task.description}
                created={task.created}
                onDeleted={() => onDeleted(task.id)} />
        </li>
    ));

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    )
}

export default TaskList;