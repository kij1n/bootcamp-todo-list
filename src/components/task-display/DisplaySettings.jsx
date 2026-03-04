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
        <div className="flex flex-col items-start justify-start gap-4 p-4 bg-gray-800 rounded-2xl w-full">
            <div className="flex flex-row gap-4 bg-gray-700 rounded-2xl px-4 py-2 w-[35%]">
                <select
                name='sorting'
                id='select-sorting'
                value={sorting}
                onChange={handleSortingChange}
                className="combo"
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
                    className="combo"
                >
                    <option value={ViewFilter.ALL}>All</option>
                    <option value={ViewFilter.TODAY}>Today</option>
                    <option value={ViewFilter.THIS_WEEK}>This week</option>
                    <option value={ViewFilter.LATER}>Later</option>
                </select>
            </div>
        </div>
    )
}

export default DisplaySettings