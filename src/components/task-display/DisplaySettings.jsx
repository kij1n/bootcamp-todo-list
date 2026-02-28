import {useContext, useState} from "react"
import {SortType} from "../../utils/enums.js";
import {AppContext} from "../../utils/AppContext.js";

function DisplaySettings() {
    const {setSettings} = useContext(AppContext)

    const [sorting, setSorting] = useState(SortType.NONE)

    const handleChange = (e) => {
        const val = e.target.value
        setSorting(val)
        setSettings((prev) => ({...prev, sorting: val}))
    }

    return (
        <>
            <select
            name='sorting'
            id='select-sorting'
            value={sorting}
            onChange={handleChange}
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