function getNewTask(task) {
    const newTask = structuredClone(task)
    if (task.repeat === "none") return null
    switch (task.repeat) {
        case "none": return null;
        case "daily":
            newTask.date.setDate(newTask.date.getDate() + 1);
            break;
        case "weekly":
            newTask.date.setDate(newTask.date.getDate() + 7);
            break;
        case "monthly":
            newTask.date.setMonth(newTask.date.getMonth() + 1);
            break;
        case "yearly":
            newTask.date.setFullYear(newTask.date.getFullYear() + 1);
            break;
        default:
            return null;
    }
    return newTask
}

function Task({task, taskData, setTaskData}) {
    const completeTask = () => {
        const newTask = getNewTask(task)
        const clone = structuredClone(taskData)
        let currentList = taskData["currentList"]
        clone[currentList] = [
            ...clone[currentList].filter(t => t.id !== task.id),
            ...(newTask ? [newTask] : [])
        ]
        setTaskData(clone)
        localStorage.setItem("taskData", JSON.stringify(clone))
    }

    return (
        <>
            <li><button onClick={completeTask}>Done</button>{task.value} {task.date}</li>
        </>
    )
}

export default Task