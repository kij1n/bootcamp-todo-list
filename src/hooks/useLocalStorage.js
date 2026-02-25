import {useState} from "react";
import {FilterType, Priority, RepeatType, SortType} from "../utils/enums.js";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key)
        try {
            const parsedItem = JSON.parse(item)
            if (key === "todos") {
                const allTasks = Object.values(parsedItem ?? []).flat()
                allTasks.forEach(task => {
                    task.date = new Date(task.date)
                    task.priority = Object.values(Priority).find(p => p === task.priority)
                    task.repeat = Object.values(RepeatType).find(r => r === task.repeat)
                })
                return parsedItem
            }
            else if (key === "settings") {
                return {
                    ...parsedItem,
                    currentList: parsedItem?.currentList ?? "index",
                    sorting: Object.values(SortType).find(p => p === parsedItem?.sorting) ?? SortType.NONE,
                    filter: Object.values(FilterType).find(r => r === parsedItem?.filter) ?? FilterType.ALL
                }
            }
        } catch (error) {
            console.error(error)
            return initialValue
        }
        return initialValue
    })

    const setStoredValue = (newValue) => {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return [value, setStoredValue]
}

export default useLocalStorage;