import React from "react";
import Task from '../task/task';
import './task-list.css';

const TaskList = ( {tasks, onDeleted, onToggleDone} ) => {

    const elements = tasks.map(task => (
        <li key={task.id}>
            <Task 
                description={task.description}
                created={task.created}
                done={task.done}
                onDeleted={() => onDeleted(task.id)} 
                onToggleDone={() => onToggleDone(task.id)}
                />
        </li>
    ));

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    )
}

export default TaskList;