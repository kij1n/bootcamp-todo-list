export function newTaskID(todos) {
    const allTasks = Object.values(todos).flat();
    const ids = allTasks.map(t =>
        (typeof t.id === 'number') ? t.id : -1
    )
    return (ids && ids.length > 0) ? Math.max(...ids) + 1 : 0;
}

export function addIfEmpty() {
    if (!localStorage.getItem("todos")) {
        localStorage.setItem("todos", JSON.stringify({
            "index": []
        }))
    }
    if (!localStorage.getItem("settings")) {
        localStorage.setItem("settings", JSON.stringify({
            "currentList": "index",
            "sorting": "none",
            "filter": "all"
        }))
    }
}