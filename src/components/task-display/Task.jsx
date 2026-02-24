export const Task = (props) => {
    return (
        <>
            <li>{props.task.value} {props.task.date}</li>
        </>
    )
}