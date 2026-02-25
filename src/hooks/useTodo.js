import useLocalStorage from "./useLocalStorage.js";
import {SortType} from "../utils/enums.js"

function sortTasks(tasks, type) {
    return tasks.toSorted((a, b) => {
        switch (type) {
            case SortType.DATE: return a.date > b.date;
            case SortType.NAME: return a.value.localeCompare(b.value);
            case SortType.PRIORITY: return a.priority > b.priority;
            default: return 0;
        }
    })
}

function useTodo() {
    const [todos, setTodos] = useLocalStorage("todos", {})

    const getTodos = (listName = null, sortingType = SortType.NONE) => {
        return sortTasks(todos[listName], sortingType) ?? []
    }
    const addTodo = (task, listName) => {
        setTodos({
            ...todos, [listName]: [...todos[listName], task]
        })
    }
    const removeTodo = (id, listName) => {
        setTodos({
            ...todos, [listName]: todos[listName].filter(t => t.id !== id)
        })
    }
    return [getTodos, addTodo, removeTodo]
}

export default useTodo;