import { useState } from 'react'
import styles from './App.module.sass'

function App() {
  const [isValue, setIsValue] = useState('');
  const [isUpdateValue, setIsUpdateValue] = useState('')
  const [isUpdateMode, setIsUpdateMode] = useState(false)
  const [todos, setTodos] = useState([
    {id: 1, title: 'Task 1', accept: false},
    {id: 2, title: 'Task 2', accept: false},
    {id: 3, title: 'Task 3', accept: false},
    {id: 4, title: 'Task 4', accept: false},
  ])
  
  const createTodo = () => {
    let newTodo = {
      id: todos.length + 1,
      title: isValue,
      accept: false,
    }
    setTodos([...todos, newTodo])
    setIsValue('')
  }
  
  const deleteTodo = (id) => {
    const filteredTodo = todos.filter(todo => todo.id !== id)
    setTodos(filteredTodo)
  }

  const acceptTask = (id) => {
    const changeAccept = todos.map(todo => todo.id === id ? {...todo, accept: !todo.accept} : todo)
    setTodos(changeAccept)
  }

  const switchMode = (todo) => {
    setIsUpdateValue({
      id: todo.id,
      title: todo.title,
      accept: todo.accept ? true : false,
    })
    setIsUpdateMode(true)
  }

  const changeTodo = (e) => {
    let newEmpty = {
      id: isUpdateValue.id,
      title: e.target.value,
      accept: isUpdateValue.accept ? true : false,
    }
    setIsUpdateValue(newEmpty)
  }

  const updateTodo = () => {
    let filteredUpdatedTodo = [...todos].filter(task => task.id !== isUpdateValue.id)
    let updateObj = [...filteredUpdatedTodo, isUpdateValue]
    setTodos(updateObj)
    setIsUpdateValue('')
    setIsUpdateMode(false)
  }
  

  const cancelUpdate = () => {
    setIsUpdateValue('')
    setIsUpdateMode(false)
  }

  return (
    <>
        <div className={styles.wrapper}>
          {isUpdateMode ? (
            <>
              <input className={styles.input} value={isUpdateValue && isUpdateValue.title} onChange={e => changeTodo(e)} placeholder='Update to do...'/>
              <button className={styles.buttonUpdate} onClick={updateTodo}>Update</button>
              <button className={styles.button} onClick={cancelUpdate}>Cancel</button>
            </>
          ) : (
            <>
              <input className={styles.input} value={isValue} onChange={e => setIsValue(e.target.value)} placeholder='Write to do...'/>
              <button className={styles.button} onClick={createTodo}>Create</button>
            </>
          )}
        </div>
        <ul className={styles.list}>
          {todos.length 
          ? todos
            .sort((a, b) => a.id > b.id ? 1 : -1)
            .map(todo => 
            <li key={todo.id} className={`${styles.listItem} ${todo.accept && styles.accepted}`}>
              <p className={`${styles.listItemText} ${todo.accept && styles.acceptedText}`}>{todo.title}</p>
              <div className={styles.btnGroup}>
                <button className={styles.listItemBtn} onClick={() => acceptTask(todo.id)}>
                  <svg className={styles.iconAccept} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"/>
                  </svg>
                </button>
                <button className={styles.listItemBtn} onClick={() => switchMode(todo)}>
                  <svg className={styles.iconChange} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C20.8027 6.94749 20.8763 6.8376 20.9264 6.71662C20.9766 6.59565 21.0024 6.46597 21.0024 6.335C21.0024 6.20403 20.9766 6.07435 20.9264 5.95338C20.8763 5.8324 20.8027 5.72251 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"/>
                  </svg>
                </button>
                <button className={styles.listItemBtn} onClick={() => deleteTodo(todo.id)}>
                  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path d="M7 7L17 17M7 17L17 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </li>
            )
          : <p className={styles.dontTask}>
            Don't find tasks
            </p>
          }
        </ul>
    </>
  )
}

export default App
