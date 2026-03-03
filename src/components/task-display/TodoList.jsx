import Task from './Task.jsx'
import {useContext} from "react";
import {AppContext} from "../../utils/AppContext.js";
import DisplaySettings from "./DisplaySettings.jsx";

function TodoList() {
    const {getTodos, settings} = useContext(AppContext)
    const tasks = getTodos(settings.currentList, settings.sorting, settings.filter)

    return (
        <>
            <div className="overflow-visible">
                <DisplaySettings />
            </div>            
            {(tasks && tasks.length !== 0) && (
                <ul className="h-full mt-1 w-full overflow-scroll">
                    {tasks.map((task) => (
                        <Task task={task} key={task.id}/>
                    ))}
                </ul>
            )}
        </>
    )
}

export default TodoList;