import {useState} from "react";

function useLocalStorage(key, initialValue, parser) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key)
        try {
            const parsedItem = JSON.parse(item)
            return parser ? parser(parsedItem) : parsedItem ?? initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
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