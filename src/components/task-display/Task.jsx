import {RepeatType} from "../../utils/enums.js";

function getNewTask(task) {
    const newTask = structuredClone(task)
    switch (task.repeat) {
        case RepeatType.NONE: return null;
        case RepeatType.DAILY:
            newTask.date.setDate(newTask.date.getDate() + 1);
            break;
        case RepeatType.WEEKLY:
            newTask.date.setDate(newTask.date.getDate() + 7);
            break;
        case RepeatType.MONTHLY:
            newTask.date.setMonth(newTask.date.getMonth() + 1);
            break;
        case RepeatType.YEARLY:
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
            <li><button onClick={completeTask}>Done</button>{task.value} {task.date.toISOString()}</li>
        </>
    )
}

export default Task