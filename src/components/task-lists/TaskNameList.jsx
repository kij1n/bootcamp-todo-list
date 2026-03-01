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
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4 w-48">
            <h2 className="text-white font-bold text-xl">Task lists</h2>
            {newList ? (
                <NewListPrompt setter={setNewList}/>
            ) : (
                <button 
                    onClick={() => setNewList(true)} 
                    className="bg-cyan-800 hover:bg-cyan-950 text-white font-bold py-2 px-4 rounded"
                >
                    Add
                </button>
            )}
            <ul className="display-content w-full flex flex-col gap-2">
                {availableLists && availableLists.length > 0 && (
                    availableLists.map((listName) => (
                        <li key={listName} id={listName === currentList ? "current-list" : ""}>
                            <button 
                                onClick={() => setCurrentList(listName)}
                                className="*:bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full text-left"
                            >
                                {listName}
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default TaskNameList