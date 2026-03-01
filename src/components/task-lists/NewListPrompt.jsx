import {useContext, useState} from "react"
import {AppContext} from "../../utils/AppContext.js";

function NewListPrompt({setter}) {
    const [value, setValue] = useState("")
    const {addList} = useContext(AppContext)

    const addListOnClick = () => {
        if (value !== "") {
            addList(value)
            setter(false)
        }
        setValue("")
    }

    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id="newListName"
                placeholder="New list name"
                className="input"
            />
            <div className="btn-container flex flex-row gap-2">
                <button onClick={() => setter(false)} className="button">Cancel</button>
                <button onClick={() => addListOnClick()} className="button">Add</button>
            </div>
        </>
    )
}

export default NewListPrompt