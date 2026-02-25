import Task from './Task.jsx'
import {useContext} from "react";
import {AppContext} from "../../utils/AppContext.js";

function TodoList() {
    const [getTodos, settings] = useContext(AppContext)
    const tasks = getTodos(settings.currentList)

    return (
        <>
            {(tasks && tasks.length !== 0) && (
                <ul>
                    {tasks.map((task) => (
                        <Task task={task} key={task.id}/>
                    ))}
                </ul>
            )}
        </>
    )
}

export default TodoList;