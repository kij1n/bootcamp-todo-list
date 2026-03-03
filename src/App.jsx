import Header from './components/Header.jsx'
import TaskNameList from './components/task-lists/TaskNameList.jsx'
import TodoList from './components/task-display/TodoList.jsx'
import TodoInput from './components/task-configuration/TodoInput.jsx'
import useLocalStorage from "./hooks/useLocalStorage.js"
import useTodo from "./hooks/useTodo.js";
import { AppContext } from "./utils/AppContext.js";
import { addIfEmpty } from "./utils/functions.js";
import './App.css'
import {useEffect} from "react";
import {SortType} from "./utils/enums.js";

function App() {
    useEffect(() => {
        addIfEmpty()
    }, [])

    const [getTodos, addTodo, removeTodo, addList, getListNames] = useTodo()
    const [settings, setSettings] = useLocalStorage(
        "settings",
        {},
        (parsedItem) => {
            return {
                ...parsedItem,
                currentList: parsedItem?.currentList ?? "index",
                sorting: Object.values(SortType).find(p => p === parsedItem?.sorting) ?? SortType.NONE
            }
        }
    )

    // TODO: add today, this week, later views !!! this week does not work
    // TODO: improve semantics

    return (
        <>
            <AppContext value={{
                getTodos, addTodo, removeTodo, settings,
                setSettings, addList, getListNames
            }}>
                <div className="flex justify-center bg-gray-900 h-screen">
                    <div className="flex flex-row gap-2 h-full pt-10 pb-10">
                        <aside className="w-48">
                            <TaskNameList/>
                        </aside>
                        <main className="flex-1 flex flex-col items-start justify-start bg-gray-800 w-200 rounded-2xl">
                                    <Header/>
                                    <TodoInput/>
                                    <TodoList/>
                        </main>
                    </div>
                </div>
            </AppContext>
        </>
    )
}

export default App
