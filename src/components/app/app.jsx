import { useState, useCallback } from 'react'
import Header from '../header/header'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import './app.css'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')
  const [intervals, setIntervals] = useState({})

  const createTodoItem = (description, time) => ({
    description,
    created: new Date().toISOString(),
    id: Date.now(),
    done: false,
    time: time || 0,
  })

  const filterTasks = {
    all: (tasks) => tasks,
    active: (tasks) => tasks.filter((task) => !task.done),
    completed: (tasks) => tasks.filter((task) => task.done),
  }

  const onToggleDone = useCallback(
    (id) => {
      setTodoData((todoData) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = { ...oldItem, done: !oldItem.done }

        if (newItem.done && intervals[id]) {
          clearInterval(intervals[id])
          setIntervals((prev) => {
            // eslint-disable-next-line no-unused-vars
            const { [id]: _, ...rest } = prev
            return rest
          })
        }

        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      })
    },
    [intervals]
  )

  const onFilterChange = useCallback((filter) => {
    setFilter(filter)
  }, [])

  const deleteItem = useCallback(
    (id) => {
      setTodoData((todoData) => todoData.filter((el) => el.id !== id))

      if (intervals[id]) {
        clearInterval(intervals[id])
        setIntervals((prev) => {
          // eslint-disable-next-line no-unused-vars
          const { [id]: _, ...rest } = prev
          return rest
        })
      }
    },
    [intervals]
  )

  const addItem = useCallback((text, time) => {
    const newTask = createTodoItem(text, time)
    setTodoData((todoData) => [...todoData, newTask])
  }, [])

  const clearCompleted = useCallback(() => {
    setTodoData((todoData) => todoData.filter((task) => !task.done))
  }, [])

  const onEditItem = useCallback((id, newText) => {
    setTodoData((todoData) => todoData.map((item) => (item.id === id ? { ...item, description: newText } : item)))
  }, [])

  const onStartTimer = useCallback(
    (id) => {
      if (intervals[id]) return

      const intervalId = setInterval(() => {
        setTodoData((todoData) => {
          return todoData.map((task) => (task.id === id && task.time > 0 ? { ...task, time: task.time - 1 } : task))
        })
      }, 1000)

      setIntervals((prev) => ({
        ...prev,
        [id]: intervalId,
      }))
    },
    [intervals, setTodoData]
  )

  const onPauseTimer = useCallback(
    (id) => {
      if (intervals[id]) {
        clearInterval(intervals[id])
        setIntervals((prev) => {
          // eslint-disable-next-line no-unused-vars
          const { [id]: _, ...rest } = prev
          return rest
        })
      }
    },
    [intervals]
  )

  const doneCount = todoData.filter((el) => el.done).length
  const todoCount = todoData.length - doneCount
  const filteredTasks = filterTasks[filter](todoData)

  return (
    <>
      <Header onAdd={addItem} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onEditItem={onEditItem}
          onStartTimer={onStartTimer}
          onPauseTimer={onPauseTimer}
        />
        <Footer
          all={todoCount}
          left={doneCount}
          filter={filter}
          onFilterChange={onFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </>
  )
}

export default App
