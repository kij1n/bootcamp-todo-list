import Task from './Task.jsx'
import {useContext} from "react";
import {AppContext} from "../../utils/AppContext.js";
import DisplaySettings from "./DisplaySettings.jsx";

function TodoList() {
    const {getTodos, settings} = useContext(AppContext)
    const tasks = getTodos(settings.currentList, settings.sorting, settings.filter)

    return (
        <div className="flex-1 flex flex-col w-full min-h-0">
            <div className="shrink-0">
                <DisplaySettings />
            </div>            
            {(tasks && tasks.length !== 0) && (
                <ul className="mt-1 w-full flex-1 min-h-0 overflow-y-auto">
                    {tasks.map((task) => (
                        <Task task={task} key={task.id}/>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TodoList;