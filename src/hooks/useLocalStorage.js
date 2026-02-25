import {useState} from "react";
import {Priority, RepeatType, FilterType, SortType} from "../utils/enums.js";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
    })
    if (key === "todos") {
        const allTasks = Object.values(value).flat()
        allTasks.forEach(task => {
            task.date = new Date(task.date)
            task.priority = Object.values(Priority).find(p => p === task.priority)
            task.repeat = Object.values(RepeatType).find(r => r === task.repeat)
        })
    }
    else if (key === "settings") {
        const cloneValue = structuredClone(value)
        cloneValue.currentList = value.currentList ?? "index"
        cloneValue.sorting = Object.values(SortType).find(p => p === value.sorting) ?? SortType.NONE
        cloneValue.filter = Object.values(FilterType).find(r => r === value.filter) ?? FilterType.ALL
        setValue(cloneValue)
    }

    const setStoredValue = (newValue) => {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return [value, setStoredValue]
}

export default useLocalStorage;