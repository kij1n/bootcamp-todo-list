import Task from './Task.jsx'

function TodoList({tasks, taskData, setTaskData}) {

    return (
        <>
            {(tasks && tasks.length !== 0) && (
                <ul>
                    {tasks.map((task) => (
                        <Task task={task} key={task.id} taskData={taskData} setTaskData={setTaskData}/>
                    ))}
                </ul>
            )}
        </>
    )
}

export default TodoList;