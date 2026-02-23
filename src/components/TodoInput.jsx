import {useState} from "react";

function TodoInput(props) {
    const listName = props.listName
    const taskData = props.taskData

    const newTaskID = (() => {
        const allTasks = Object.values(taskData).flat()
        const ids = allTasks.map(t =>
            (typeof t.id === 'number') ? t.id : -1
        )
        return (ids && ids.length > 0) ? Math.max(...ids) + 1 : 0
    })

    const [value, setValue] = useState("")

    const handleEnter = (event) => {
        if (event.key === 'Enter' && value !== '') {
            const newData = (() => {
                try {
                    const clone = structuredClone(taskData)
                    if (
                        Array.isArray(clone[listName]) &&
                        clone[listName].length === 0
                    ) {
                        clone[listName] = [{value: value, id: newTaskID()}]
                    } else {
                        clone[listName] = [...clone[listName], {value: value, id: newTaskID()}]
                    }
                    clone["currentList"] = listName
                    return clone
                } catch (error) {
                    console.log(error)

                    const clone = {}
                    clone["currentList"] = listName
                    clone[listName] = [{value: value, id: newTaskID()}]
                    return clone
                }
            })()

            localStorage.setItem("taskData",
                JSON.stringify(newData)
            )
            props.setTaskData(newData)
            setValue("")
        }
    }

    return (
        <>
            <input
                type="text"
                id="newTask"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add a new task"
                onKeyDown={handleEnter}
            />
        </>
    )
}

export default TodoInput