export function newTaskID(taskData) {
    const allTasks = Object.values(taskData).flat();
    const ids = allTasks.map(t =>
        (typeof t.id === 'number') ? t.id : -1
    );
    return (ids && ids.length > 0) ? Math.max(...ids) + 1 : 0;
}

export function getDataClone(taskData) {
    try {
        const clone = structuredClone(taskData)
        clone.date = new Date(clone.date)
        return clone
    } catch (error) {
        console.log(error)
        return {}
    }
}