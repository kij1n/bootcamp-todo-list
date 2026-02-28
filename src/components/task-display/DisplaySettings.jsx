import {useContext, useState} from "react"
import {SortType} from "../../utils/enums.js";
import {AppContext} from "../../utils/AppContext.js";

function DisplaySettings() {
    const {setSettings} = useContext(AppContext)

    const [sorting, setSorting] = useState(() => {
        const sorting = SortType.NONE
        const setSorting = (newVal) => {
            setSettings((prev) => ({...prev, sorting: newVal}))
        }
        return [sorting, setSorting]
    })

    return (
        <>
            <select
            name='sorting'
            id='select-sorting'
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
            >
                <option value={SortType.NONE}>None</option>
                <option value={SortType.NAME}>Name</option>
                <option value={SortType.DATE}>Date</option>
                <option value={SortType.PRIORITY}>Priority</option>
            </select>
        </>
    )
}

export default DisplaySettings