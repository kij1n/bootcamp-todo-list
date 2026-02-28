export function newTaskID(todos) {
    // const allTasks = Object.values(todos).flat();
    // console.log(todos)
    const ids = todos.map(t =>
        (typeof t.id === 'number') ? t.id : -1
    )
    // console.log(ids)
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