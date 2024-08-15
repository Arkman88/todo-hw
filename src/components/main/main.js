import React from "react";
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

const Main = () => {

    const todoData = [
        {description: 'Completed task', 
            created: 'created 17 seconds ago', 
            classNameInfo: 'completed',
            id: 1},
        {description: 'Editing task', 
            created: 'created 5 minutes ago', 
            classNameInfo: 'editing',
            id: 2},
        {description: 'Active task', 
            created: 'created 5 minutes ago', 
            classNameInfo: 'active',
            id: 3}
    ]

    return (
        <section className="main">
            <TaskList todos={todoData}/>
            <Footer />
        </section>
    )
}

export default Main;