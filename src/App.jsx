import Header from './components/Header.jsx'
import TaskNameList from './components/task-lists/TaskNameList.jsx'
import TodoList from './components/task-display/TodoList.jsx'
import TodoInput from './components/task-display/TodoInput.jsx'
import { useState } from 'react'
import './App.css'

function App() {
    const [taskData, setTaskData] = useState(() => {
        const dataStr = localStorage.getItem("taskData")
        if (!dataStr) {
            return {"currentList": "index", "index": []}
        }
        try {
            const data = JSON.parse(dataStr)
            if (!Object.prototype.hasOwnProperty.call(data, "currentList")) {
                return {
                    ...data, "currentList": "index", "index": []
                }
            }

            const allTasks = Object.values(data).flat().filter(t => t && t.date);
            allTasks.forEach(task => task.date = new Date(task.date))

            return data
        } catch (error) {
            console.error(error)
            return {"currentList": "index", "index": []}
        }
    })

    const listName = taskData.currentList

    return (
        <>
            <TaskNameList taskData={taskData} setTaskData={setTaskData}/>
            <div>
                <Header listName={listName} />
                <TodoInput taskData={taskData} setTaskData={setTaskData} listName={listName}/>
                <TodoList taskData={taskData} setTaskData={setTaskData} tasks={taskData[listName] ?? []}/>
            </div>
        </>
    )
}

export default App
