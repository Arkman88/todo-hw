import React from "react";
import Task from '../task/task';
import './task-list.css';

const TaskList = ({ tasks, onDeleted, onToggleDone, onEditItem }) => {
    const elements = tasks.map((task) => (
        <li key={task.id}>
            <Task
                id={task.id}
                description={task.description}
                created={task.created}
                done={task.done}
                onDeleted={() => onDeleted(task.id)}
                onToggleDone={() => onToggleDone(task.id)}
                onEditItem={onEditItem}
            />
        </li>
    ));

    return (
        <ul className="todo-list">
            {elements}
        </ul>
    );
};

export default TaskList;
