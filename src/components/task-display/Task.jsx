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
    const {addTodo, removeTodo, settings} = useContext(AppContext)

    const completeTask = () => {
        removeTodo(task.id, settings.currentList)
        if (task.repeat !== RepeatType.NONE) {
            addTodo(getNewTask(task), settings.currentList)
        }
    }

    return (
        <>
            <li className="flex justify-between items-center gap-2 w-[calc(100%-1rem)] px-4 py-2 bg-gray-700 rounded-xl m-2">
                <div className="flex items-center gap-2">
                    <button onClick={completeTask}>Done</button>
                    <span>{task.value}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span></span>
                </div>
            </li>
        </>
    )
}

export default Task