import TodoHeader from './components/TodoHeader.jsx'
import TodoList from './components/TodoList.jsx'
import TodoInput from './components/TodoInput.jsx'
import { useState } from 'react'
import './App.css'

function App() {
  const [tasks] = useState(() => {
    const dataStr = localStorage['tasks']
    if (!dataStr) {
        return []
    }

    try {
        return JSON.parse(dataStr)
    }
    catch (error) {
        console.error(error)
        return []
    }
  });

  const listName = 'test'

  return (
    <>
      <TodoHeader listName={listName}/>
      <TodoInput />
      <TodoList listName={listName} tasks={tasks} />
    </>
  )
}

export default App
