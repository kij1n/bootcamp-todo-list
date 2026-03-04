import useLocalStorage from "./useLocalStorage.js";
import {Priority, RepeatType, SortType, ViewFilter} from "../utils/enums.js"
import {sameWeek, laterThanWeekDate, getToday} from "../utils/functions.js";

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

function filterTasks(tasks, filter) {
    return tasks.filter(t => {
        switch (filter) {
            case ViewFilter.ALL: return true;
            case ViewFilter.TODAY: return t.date <= getToday();
            case ViewFilter.THIS_WEEK: return sameWeek(t.date, getToday());
            case ViewFilter.LATER: return laterThanWeekDate(t.date, getToday());
            default: return true;
        }
    })
}

function sortTasks(allTasks, type, listName) {
    const tasks = (() => { // tasks: [task, task, task]
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
    const [todos, setTodos] = useLocalStorage( // todos: {listName: [task, task, task]}
        "todos",
        {},
        prepareTodos
    )

    const getListNames = () => Object.keys(todos)
    const getTodos = (
        listName = null,
        sortingType = SortType.NONE,
        filter = ViewFilter.ALL
    ) => {
        return filterTasks(sortTasks(todos, sortingType, listName), filter)
    }
    const addTodo = (task, listName) => {
        task = {...task, id: crypto.randomUUID()}
        setTodos(prev => ({
            ...prev, [listName]: [...prev[listName], task]
        }))
    }
    const removeTodo = (id, listName) => {
        setTodos(prev => ({
            ...prev, [listName]: prev[listName].filter(t => t.id !== id)
        }))
    }
    const addList = (listName) => {
        setTodos({
            ...todos, [listName]: []
        })
    }

    return [getTodos, addTodo, removeTodo, addList, getListNames]
}

export default useTodo;