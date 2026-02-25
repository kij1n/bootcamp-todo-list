import Header from './components/Header.jsx'
import TaskNameList from './components/task-lists/TaskNameList.jsx'
import TodoList from './components/task-display/TodoList.jsx'
import TodoInput from './components/task-display/TodoInput.jsx'
import useLocalStorage from "./hooks/useLocalStorage.js"
import useTodo from "./hooks/useTodo.js";
import { AppContext } from "./utils/AppContext.js";
import './App.css'

function App() {
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
