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