import React from 'react'

import Header from '../header/header'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import './app.css'

export default class App extends React.Component {
  state = {
    todoData: [],
    filter: 'all',
  }

  static createTodoItem(description) {
    return {
      description,
      created: Date.now(),
      id: Date.now(),
      done: false,
    }
  }

  addItem = (text) => {
    const newTask = App.createTodoItem(text)
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
    }))
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.id !== id)
      return { todoData: newArr }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return { todoData: newArr }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  filterTasks = {
    all: (tasks) => tasks,
    active: (tasks) => tasks.filter((task) => !task.done),
    completed: (tasks) => tasks.filter((task) => task.done),
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((task) => !task.done)
      return { todoData: newArr }
    })
  }

  onEditItem = (id, newText) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => (item.id === id ? { ...item, description: newText } : item)),
    }))
  }

  render() {
    const { todoData, filter } = this.state
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    const filteredTasks = this.filterTasks[filter](todoData)

    return (
      <>
        <Header onAdd={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditItem={this.onEditItem}
          />
          <Footer
            all={todoCount}
            left={doneCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </>
    )
  }
}
