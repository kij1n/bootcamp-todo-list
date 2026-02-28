import Header from './components/Header.jsx'
import TaskNameList from './components/task-lists/TaskNameList.jsx'
import TodoList from './components/task-display/TodoList.jsx'
import TodoInput from './components/task-display/TodoInput.jsx'
import useLocalStorage from "./hooks/useLocalStorage.js"
import useTodo from "./hooks/useTodo.js";
import { AppContext } from "./utils/AppContext.js";
import { addIfEmpty } from "./utils/functions.js";
import './App.css'

function App() {
    addIfEmpty()

    const [getTodos, addTodo, removeTodo, addList, getListNames] = useTodo()
    const [settings, setSettings] = useLocalStorage("settings", {})

    // TODO: sorting with date an priority
    // TODO: remove filtering
    // TODO: add today, this week, later views
    // TODO: add completed tasks as a dropdown menu

    return (
        <>
            <AppContext value={{
                getTodos, addTodo, removeTodo, settings,
                setSettings, addList, getListNames
            }}>
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
