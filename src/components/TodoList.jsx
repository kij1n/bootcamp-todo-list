import { Task } from './Task.jsx'

function TodoList(props) {
    const tasks = props.tasks

    return (
        <>
            {(tasks && tasks.length !== 0) && (
                <ul>
                    {tasks.map((task) => (
                        <Task task={task.value} key={task.id}/>
                    ))}
                </ul>
            )}
        </>
    )
}

export default TodoList;