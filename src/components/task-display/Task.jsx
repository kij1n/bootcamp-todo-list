import {RepeatType} from "../../utils/enums.js";
import {AppContext} from "../../utils/AppContext.js";
import {useContext} from "react";
import {Priority} from "../../utils/enums.js";

function prettyDate(date) {
    return date.toLocaleDateString("en-EU", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}

function btnColorStr(priority) {
    switch (priority) {
        case Priority.HIGH: return "bg-red-500 hover:bg-red-700";
        case Priority.MEDIUM: return "bg-yellow-500 hover:bg-yellow-700";
        case Priority.LOW: return "bg-green-500 hover:bg-green-700";
        default: return "bg-gray-500 hover:bg-gray-700";
    }
}

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
        console.log("removed task with id: " + task.id)
        if (task.repeat !== RepeatType.NONE) {
            addTodo(getNewTask(task), settings.currentList)
        }
    }

    return (
        <>
            <li className="flex justify-between items-center gap-2 w-[calc(100%-1rem)] px-4 py-2 bg-gray-700 rounded-xl m-2">
                <div className="flex items-center gap-2">
                    <button onClick={completeTask} className={`task-button ${btnColorStr(task.priority)}`}>
                        Done
                    </button>
                    <span>{task.value}</span>
                </div>
                <div className="flex items-center gap-5">
                    <span className="text-gray-500">{task.repeat}</span>
                    <span className="text-gray-400">{prettyDate(task.date)}</span>
                </div>
            </li>
        </>
    )
}

export default Task