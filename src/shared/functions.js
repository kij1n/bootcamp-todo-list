export function newTaskID(taskData) {
    const allTasks = Object.values(taskData).flat();
    const ids = allTasks.map(t =>
        (typeof t.id === 'number') ? t.id : -1
    );
    return (ids && ids.length > 0) ? Math.max(...ids) + 1 : 0;
}

export function getDataClone(taskData) {
    try {
        // const allTasks = Object.values(taskData).flat().filter(t => t.date instanceof Date);
        // allTasks.forEach(task => task.date = new Date(task.date))

        return structuredClone(taskData)
    } catch (error) {
        console.log(error)
        return {}
    }
}