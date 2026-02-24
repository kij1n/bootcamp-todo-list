import { useState } from "react"

function NewListPrompt(props) {
    const [value, setValue] = useState("")

    const addNewList = () => {
        const value = document.getElementById("newListName").value
        if (value === "") return
        const newData = (() => {
            try {
                const clone = structuredClone(props.taskData)
                clone[value] = []
                return clone
            } catch (error) {
                console.error(error)
                const clone = {}
                clone[value] = []
                return clone
            }
        })()

        localStorage.setItem("taskData",
            JSON.stringify(newData)
        )
        props.setTaskData(newData)
        setValue("")
        props.setter(false) // close the prompt
    }

    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id="newListName"
                placeholder="New list name"
            />
            <div className="btn-container">
                <button onClick={() => props.setter(false)}>Cancel</button>
                <button onClick={() => addNewList()}>Add</button>
            </div>
        </>
    )
}

export default NewListPrompt