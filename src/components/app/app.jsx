import React from 'react'

import Header from '../header/header'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import './app.css'

export default class App extends React.Component {
  static createTodoItem(description, time) {
    return {
      description,
      created: new Date().toISOString(),
      id: Date.now(),
      done: false,
      time,
      timer: { seconds: time, isRunning: false },
    }
  }

  filterTasks = {
    all: (tasks) => tasks,
    active: (tasks) => tasks.filter((task) => !task.done),
    completed: (tasks) => tasks.filter((task) => task.done),
  }

  state = {
    todoData: [],
    filter: 'all',
    timers: {},
  }

  onToggleDone = (id) => {
    this.setState(({ todoData, timers }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      if (!oldItem.done) {
        if (timers[id]?.timerId) clearInterval(timers[id].timerId)

        const newTimers = { ...timers }
        delete newTimers[id]
        return { todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)], timers: newTimers }
      }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return { todoData: newArr }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  deleteItem = (id) => {
    this.setState(({ todoData, timers }) => {
      const newArr = todoData.filter((el) => el.id !== id)

      if (timers[id]?.timerId) {
        clearInterval(timers[id].timerId)
      }

      return {
        todoData: newArr,
        timers: { ...timers, [id]: { ...timers[id], time: 0, timerId: null } },
      }
    })
  }

  addItem = (text, time) => {
    const newTask = App.createTodoItem(text, time)
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
    }))
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

  startTimer = (id) => {
    this.setState((state) => {
      const task = state.todoData.find((task) => task.id === id)
      const taskTimer = state.timers[id] || { time: task.time }

      if (taskTimer.isRunning || taskTimer.time <= 0) return null

      const timerId = setInterval(() => {
        this.setState(({ timers }) => {
          const currentTimer = timers[id] || { time: taskTimer.time }

          if (currentTimer.time > 0) {
            return {
              timers: { ...timers, [id]: { ...currentTimer, time: currentTimer.time - 1, isRunning: true } },
            }
          } else {
            clearInterval(timerId)
            return {
              timers: { ...timers, [id]: { ...currentTimer, time: 0, isRunning: false, timerId: null } },
            }
          }
        })
      }, 1000)

      return {
        timers: { ...state.timers, [id]: { ...taskTimer, timerId, isRunning: true } },
      }
    })
  }

  pauseTimer = (id) => {
    this.setState(({ timers }) => {
      const taskTimer = timers[id]
      if (taskTimer?.timerId) {
        clearInterval(taskTimer.timerId)
        return {
          timers: { ...timers, [id]: { ...taskTimer, timerId: null, isRunning: false } },
        }
      }
      return null
    })
  }

  render() {
    const { todoData, filter, timers } = this.state
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    const filteredTasks = this.filterTasks[filter](todoData)

    return (
      <>
        <Header onAdd={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            timers={timers}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditItem={this.onEditItem}
            onStartTimer={this.startTimer}
            onPauseTimer={this.pauseTimer}
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
