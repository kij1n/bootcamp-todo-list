import {useState} from "react";
import {Priority, RepeatType, SortType} from "../utils/enums.js";

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

function prepareSettings(parsedItem) {
    return {
        ...parsedItem,
        currentList: parsedItem?.currentList ?? "index",
        sorting: Object.values(SortType).find(p => p === parsedItem?.sorting) ?? SortType.NONE
    }
}

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key)
        try {
            const parsedItem = JSON.parse(item)
            if (key === "todos") {
                return prepareTodos(parsedItem)
            }
            else if (key === "settings") {
                return prepareSettings(parsedItem)
            }
        } catch (error) {
            console.error(error)
            return initialValue
        }
        return initialValue
    })

    const setStoredValue = (newValue) => {
        setValue((prev) => {
            const val = typeof newValue === 'function' ? newValue(prev) : newValue
            localStorage.setItem(key, JSON.stringify(val))
            return val
        })
    }

    return [value, setStoredValue]
}

export default useLocalStorage;