import TaskSettings from "./TaskSettings";
import {useState} from "react";

function TodoInput(props) {
    const listName = props.taskData.currentList
    const taskData = props.taskData

    const newTaskID = (() => {
        const allTasks = Object.values(taskData).flat();
        const ids = allTasks.map(t =>
            (typeof t.id === 'number') ? t.id : -1
        );
        return (ids && ids.length > 0) ? Math.max(...ids) + 1 : 0;
    });

    const [taskValue, setTaskValue] = useState(() => {
        return {
            value: "",
            id: newTaskID(),
            date: null | Date,
            repeat: null | String
        }
    });
    const [moreSettings, setMoreSettings] = useState(false);

    const handleEnter = (event) => {
        if (event.key === 'Enter' && taskValue.value !== '') {
            const newData = (() => {
                try {
                    const clone = structuredClone(taskData)
                    if (
                        Array.isArray(clone[listName]) &&
                        clone[listName].length === 0
                    ) {
                        clone[listName] = [{...taskValue}]
                    } else {
                        clone[listName] = [...clone[listName], {...taskValue}]
                    }
                    clone["currentList"] = listName
                    return clone
                } catch (error) {
                    console.log(error)

                    const clone = {}
                    clone["currentList"] = listName
                    clone[listName] = [{...taskValue}]
                    return clone
                }
            })()

            localStorage.setItem("taskData",
                JSON.stringify(newData)
            )
            props.setTaskData(newData)
            setTaskValue({
                value: "",
                id: newTaskID() + 1,
                date: null | Date,
                repeat: null | String
            })
        }
    };
    const handleSettingsSubmit = (settingsData) => {
        const clone = structuredClone(taskValue)
        clone.date = settingsData.date
        clone.repeat = settingsData.repeat
        setTaskValue(clone)
        setMoreSettings(false)
    };

    return (
        <>
            {moreSettings ? (
                <TaskSettings
                    onClose={() => setMoreSettings(false)}
                    onSubmit={(settingsData) => handleSettingsSubmit(settingsData)}
                    setter={setMoreSettings}
                />
            ) :
                <input
                    type="text"
                    id="newTask"
                    value={taskValue.value}
                    onChange={(e) => setTaskValue((prev) => ({...prev, value: e.target.value}))}
                    placeholder="Add a new task"
                    onKeyDown={handleEnter}
                />
            }
            <button onClick={() => setMoreSettings(true)}>More</button>
        </>
    );
}

export default TodoInput;