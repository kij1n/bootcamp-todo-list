import { useState, useContext } from "react"
import NewListPrompt from "./NewListPrompt.jsx";
import {AppContext} from "../../utils/AppContext.js";


function TaskNameList() {
    const [newList, setNewList] = useState(false)
    const {getListNames, settings, setSettings} = useContext(AppContext)

    const availableLists = getListNames()
    const currentList = settings?.currentList ?? "index"

    const setCurrentList = (newListName) => {
        setSettings((prev) => ({...prev, currentList: newListName}))
    }

    return (
        <>
            <h2>Task lists</h2>
            {newList ? (
                <NewListPrompt setter={setNewList}/>
            ) : (
                <button onClick={() => setNewList(true)}>Add</button>
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