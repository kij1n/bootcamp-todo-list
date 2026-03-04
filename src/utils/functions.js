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

export function sameWeek(date, today) {
    const [weekStart, weekEnd] = (() => {
        const weekStart = new Date(today)
        weekStart.setDate(weekStart.getDate() - weekStart.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekEnd.getDate() + 6)
        return [weekStart, weekEnd]
    })()
    return date >= weekStart && date <= weekEnd
}

export function laterThanWeekDate(date, today) {
    const weekEnd = new Date(today)
    weekEnd.setDate(weekEnd.getDate() + 6 - weekEnd.getDay() + 1)
    return date > weekEnd
}

export function getToday() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
}