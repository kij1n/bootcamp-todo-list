import Header from './components/Header.jsx'
import TaskNameList from './components/task-lists/TaskNameList.jsx'
import TodoList from './components/task-display/TodoList.jsx'
import TodoInput from './components/task-display/TodoInput.jsx'
import useLocalStorage from "./hooks/useLocalStorage.js"
import useTodo from "./hooks/useTodo.js";
import { AppContext } from "./utils/AppContext.js";
import './App.css'

function App() {
    // const [taskData, setTaskData] = useState(() => {
    //     const dataStr = localStorage.getItem("taskData")
    //     if (!dataStr) {
    //         return {"currentList": "index", "index": []}
    //     }
    //     try {
    //         const data = JSON.parse(dataStr)
    //         if (!Object.prototype.hasOwnProperty.call(data, "currentList")) {
    //             return {
    //                 ...data, "currentList": "index", "index": []
    //             }
    //         }
    //
    //         const allTasks = Object.values(data).flat().filter(t => t && t.date);
    //         allTasks.forEach(task => task.date = new Date(task.date))
    //
    //         return data
    //     } catch (error) {
    //         console.error(error)
    //         return {"currentList": "index", "index": []}
    //     }
    // })

    const [getTodos, addTodo, removeTodo] = useTodo()
    const [settings, setSettings] = useLocalStorage("settings", {})

    return (
        <>
            <AppContext value={{getTodos, addTodo, removeTodo, settings, setSettings}}>
                <TaskNameList/>
                <div>
                    <Header/>
                    <TodoInput/>
                    <TodoList/>
                </div>
            </AppContext>
        </>
    )
}

export default App
