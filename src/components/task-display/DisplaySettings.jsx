import {useContext, useState} from "react"
import {SortType, ViewFilter} from "../../utils/enums.js";
import {AppContext} from "../../utils/AppContext.js";

function DisplaySettings() {
    const {settings, setSettings} = useContext(AppContext)

    const [sorting, setSorting] = useState(settings.sorting)
    const [filter, setFilter] = useState(settings.filter)

    const handleSortingChange = (e) => {
        const val = e.target.value
        setSorting(val)
        setSettings((prev) => ({...prev, sorting: val}))
    }
    const handleFilterChange = (e) => {
        const val = e.target.value
        setFilter(val)
        setSettings((prev) => ({...prev, filter: val}))
    }

    return (
        <>
            <select
            name='sorting'
            id='select-sorting'
            value={sorting}
            onChange={handleSortingChange}
            >
                <option value={SortType.NONE}>None</option>
                <option value={SortType.NAME}>Name</option>
                <option value={SortType.DATE}>Date</option>
                <option value={SortType.PRIORITY}>Priority</option>
            </select>
            <select
                name="time-range"
                id="select-time-range"
                value={filter}
                onChange={handleFilterChange}
            >
                <option value={ViewFilter.ALL}>All</option>
                <option value={ViewFilter.TODAY}>Today</option>
                <option value={ViewFilter.THIS_WEEK}>This week</option>
                <option value={ViewFilter.LATER}>Later</option>
            </select>
        </>
    )
}

export default DisplaySettings