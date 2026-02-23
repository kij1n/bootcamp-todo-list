import TodoHeader from './components/TodoHeader.jsx'
import TaskNameList from './components/TaskNameList.jsx'
import TodoList from './components/TodoList.jsx'
import TodoInput from './components/TodoInput.jsx'
import { useState } from 'react'
import './App.css'

function App() {
    const [taskData, setTaskData] = useState(() => {
        const dataStr = localStorage['taskData']
        if (!dataStr) {
            return {"currentList": "index"}
        }
        try {
            const data = JSON.parse(dataStr)
            if (!Object.prototype.hasOwnProperty.call(data, "currentList")) {
                return {
                    ...data, "currentList": "index"
                }
            }
            return data
        } catch (error) {
            console.error(error)
            return {"currentList": "index"}
        }
    })

    const listName = taskData.currentList
    const currentTasks = (() => {
        if (!taskData[listName]) {
            return []
        }
        return taskData[listName]
    })

    return (
        <>
            <TaskNameList taskData={taskData} setTaskData={setTaskData}/>
            <div>
                <TodoHeader listName={listName} />
                <TodoInput listName={listName} taskData={taskData} setTaskData={setTaskData}/>
                <TodoList listName={listName} tasks={currentTasks()}/>
            </div>
        </>
    )
}

export default App
