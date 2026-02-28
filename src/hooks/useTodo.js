import useLocalStorage from "./useLocalStorage.js";
import {Priority, RepeatType, SortType} from "../utils/enums.js"

function prepareTodos(parsedItem) {
    if (!parsedItem) {
        return {"index": []}
    }

    const allTasks = Object.values(parsedItem ?? []).flat()
    allTasks.forEach(task => {
        task.date = new Date(task.date)
        task.priority = Object.values(Priority).find(p => p === task.priority)
        task.repeat = Object.values(RepeatType).find(r => r === task.repeat)
    })
    return parsedItem
}

function sortTasks(allTasks, type, listName) {
    const tasks = (() => {
        if (listName) {
            return allTasks?.[listName] ?? []
        }
        return Object.values(allTasks).flat()
    })()

    return tasks.toSorted((a, b) => {
        switch (type) {
            case SortType.DATE: return a.date > b.date;
            case SortType.NAME: return a.value.localeCompare(b.value);
            case SortType.PRIORITY: return a.priority < b.priority;
            default: return 0;
        }
    })
}

function useTodo() {
    const [todos, setTodos] = useLocalStorage(
        "todos",
        {},
        prepareTodos
    )

    const getListNames = () => Object.keys(todos)
    const getTodos = (listName = null, sortingType = SortType.NONE) => {
        return sortTasks(todos, sortingType, listName) //?? []
    }
    const addTodo = (task, listName) => {
        task = {...task, id: Date.now().toString()}
        setTodos({
            ...todos, [listName]: [...todos[listName], task]
        })
    }
    const removeTodo = (id, listName) => {
        setTodos({
            ...todos, [listName]: todos[listName].filter(t => t.id !== id)
        })
    }
    const addList = (listName) => {
        setTodos({
            ...todos, [listName]: []
        })
    }

    return [getTodos, addTodo, removeTodo, addList, getListNames]
}

export default useTodo;