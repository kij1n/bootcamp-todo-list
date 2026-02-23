import { Task } from './Task.jsx'

function TodoList(props) {
    const listName = props.listName
    const tasks = props.tasks[listName]

    return (
        <>
            {(tasks && tasks.length !== 0) && (
                <ul>
                    {tasks.map((task) => (
                        <Task task={task}/>
                    ))}
                </ul>
            )}
        </>
    )
}

export default TodoList;