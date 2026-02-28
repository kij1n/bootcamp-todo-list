export function addIfEmpty() {
    if (!localStorage.getItem("todos")) {
        localStorage.setItem("todos", JSON.stringify({
            "index": []
        }))
    }
    if (!localStorage.getItem("settings")) {
        localStorage.setItem("settings", JSON.stringify({
            "currentList": "index",
            "sorting": "none"
        }))
    }
}

export function sameWeek(date1, date2) {
    if (Math.abs(date1 - date2) > 7*24*60*60*1000) return false

    const [weekStart, weekEnd] = (() => {
        const weekStart = new Date(date1)
        weekStart.setDate(weekStart.getDate() - weekStart.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekEnd.getDate() + 6)
        return [weekStart, weekEnd]
    })()

    return date2 >= weekStart && date2 <= weekEnd
}

export function laterThanWeekDate(date, today) {
    const weekEnd = new Date(today)
    weekEnd.setDate(weekEnd.getDate() + 6 - weekEnd.getDay())
    return date > weekEnd
}

export function getToday() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
}