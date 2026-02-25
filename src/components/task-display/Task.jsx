import {RepeatType} from "../../utils/enums.js";
import {AppContext} from "../../utils/AppContext.js";
import {useContext} from "react";

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

function Task({task}) {
    const [addTodo, removeTodo, settings] = useContext(AppContext)

    const completeTask = () => {
        removeTodo(task.id, settings.currentList)
        if (task.repeat !== RepeatType.NONE) {
            addTodo(getNewTask(task), settings.currentList)
        }
    }

    return (
        <>
            <li><button onClick={completeTask}>Done</button>{task.value} {task.date.toISOString()}</li>
        </>
    )
}

export default Task