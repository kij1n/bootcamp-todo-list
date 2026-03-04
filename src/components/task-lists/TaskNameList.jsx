import { useState, useContext } from "react"
import NewListPrompt from "./NewListPrompt.jsx";
import {AppContext} from "../../utils/AppContext.js";



function TaskNameList() {
    const [newList, setNewList] = useState(false)
    const {getListNames, delList, settings, setSettings} = useContext(AppContext)

    const availableLists = getListNames()
    const currentList = settings?.currentList ?? "index"

    const setCurrentList = (newListName) => {
        setSettings((prev) => ({...prev, currentList: newListName}))
    }

    const deleteList = (listName) => {
        delList(listName)
        if (currentList === listName) {
            setCurrentList("")
        }
    }

    return (
        <div className="bg-gray-800 p-4 rounded-2xl flex flex-col gap-4 w-48">
            <h2 className="text-white font-bold text-xl">Task lists</h2>
            {newList ? (
                <NewListPrompt setter={setNewList}/>
            ) : (
                <button 
                    onClick={() => setNewList(true)} 
                    className="button"
                >
                    Add
                </button>
            )}
            <ul className="display-content w-full flex flex-col gap-2">
                {availableLists && availableLists.length > 0 && (
                    availableLists.map((listName) => (
                        <li key={listName} className="flex flex-row justify-between w-full">
                            <button 
                                onClick={() => setCurrentList(listName)}
                                className={`hover:bg-slate-500 text-white py-2 px-4 rounded w-full text-left ${listName === currentList ? "bg-slate-600 font-bold" : "bg-slate-700"}`}
                            >
                                {listName}
                            </button>
                            <button className="del-button" onClick={() => deleteList(listName)}>
                                del
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default TaskNameList