import { useState } from "react"
import NewListPrompt from "./NewListPrompt.jsx";

function TaskNameList(props) {
    const availableLists = (() => {
        const lists = [...Object.keys(props.taskData)].filter(k => k !== "currentList")
        return lists.length === 0 ? ["index"] : lists
    })()
    const currentList = props.taskData.currentList

    const setCurrentList = (listName) => {
        const newData = (() => {
            try {
                const clone = structuredClone(props.taskData)
                clone["currentList"] = listName
                return clone
            } catch (error) {
                console.error(error)
                const clone = {}
                clone["currentList"] = listName
                return clone
            }
        })()
        props.setTaskData(newData)
        localStorage.setItem("taskData", JSON.stringify(newData))
    }

    const [newList, setNewList] = useState(false)

    return (
        <>
            <h2>Task lists</h2>
            <button onClick={() => setNewList(true)}>Add</button>
            {newList && (
                <NewListPrompt taskData={props.taskData} setTaskData={props.setTaskData} setter={setNewList}/>
            )}
            <ul>
                {availableLists && availableLists.length > 0 && (
                    availableLists.map((listName) => (
                        <li key={listName} id={listName === currentList ? "current-list" : ""}>
                            <button onClick={() => setCurrentList(listName)}>{listName}</button>
                        </li>
                    ))
                )}
            </ul>
        </>
    )
}

export default TaskNameList