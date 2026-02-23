import TodoHeader from './components/TodoHeader.jsx'
import TodoList from './components/TodoList.jsx'
import TodoInput from './components/TodoInput.jsx'
import {useState} from 'react'
import './App.css'

function App() {
    const [taskData, setTaskData] = useState(() => {
        const dataStr = localStorage['taskData']
        if (!dataStr) {
            return {}
        }

        try {
            return JSON.parse(dataStr)
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // console.error(error)
            return {}
        }
    });

    const listName = 'test'
    const currentTasks = (() => {
        if (!taskData[listName]) {
            return []
        }
        return taskData[listName]
    })

    return (
        <>
            <TodoHeader listName={listName}/>
            <TodoInput listName={listName} setTaskData={setTaskData}/>
            <TodoList listName={listName} tasks={currentTasks()}/>
        </>
    )
}

export default App
