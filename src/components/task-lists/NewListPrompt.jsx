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
            />
            <div className="btn-container">
                <button onClick={() => setter(false)}>Cancel</button>
                <button onClick={() => addListOnClick()}>Add</button>
            </div>
        </>
    )
}

export default NewListPrompt