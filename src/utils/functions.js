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
    // if (Math.abs(date1 - date2) > 7*24*60*60*1000) return false

    const [weekStart, weekEnd] = (() => {
        const weekStart = new Date(today)
        weekStart.setDate(weekStart.getDate() - weekStart.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekEnd.getDate() + 7)
        return [weekStart, weekEnd]
    })()

    console.log(weekStart, weekEnd)
    console.log(date)
    console.log(date >= weekStart && date <= weekEnd)

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