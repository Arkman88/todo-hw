import React from 'react';
import Header from '../header/header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './app.css';

export default class App extends React.Component {


    state = {
        todoData: [
            { description: 'Completed task', created: Date.now(), id: 1 },
            { description: 'Editing task', created: Date.now(), id: 2 },
            { description: 'Active task', created: Date.now(), id: 3 }
        ]
    };

    addItem = (text) => {
        const newTask = {
            description: text,
            created: Date.now(),
            id: Date.now(),
        };
        this.setState(({ todoData }) => ({
            todoData: [...todoData, newTask]
        }));
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArr = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newArr
            };
        });
    };

    render() {
        const { todoData } = this.state;
        return (
            <>
                <Header onAdd={this.addItem} />
                <section className="main">
                    <TaskList tasks={todoData} onDeleted={this.deleteItem} />
                    <Footer />
                </section>
            </>
        );
    }
}
