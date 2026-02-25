import TaskSettings from "./TaskSettings";
import {useState} from "react";
import {newTaskID, getDataClone} from '../../utils/functions.js'

function TodoInput({taskData, listName, setTaskData}) {
    const [taskValue, setTaskValue] = useState(() => {
        return {
            value: "",
            id: newTaskID(taskData),
            date: new Date(),
            repeat: "none"
        }
    });
    const [moreSettings, setMoreSettings] = useState(false);

    const handleEnter = (event) => {
        if (event.key === 'Enter' && taskValue.value !== '') {
            const newData = (() => {
                const clone = getDataClone(taskData)
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
            })()

            localStorage.setItem("taskData",
                JSON.stringify(newData)
            )
            setTaskData(newData)
            setTaskValue({
                value: "",
                id: newTaskID(taskData) + 1,
                date: new Date(),
                repeat: "none"
            })
        }
    };
    const handleSettingsSubmit = (settingsData) => {
        const taskClone = structuredClone(taskValue)
        taskClone.date = new Date(settingsData.date)
        taskClone.repeat = settingsData.repeat
        setTaskValue(taskClone)
        setMoreSettings(false)
    };

    return (
        <>
            { moreSettings ? (
                <TaskSettings
                    onClose={() => setMoreSettings(false)}
                    onSubmit={(settingsData) => handleSettingsSubmit(settingsData)}
                />
            ) : (
                <>
                    <input
                        type="text"
                        id="newTask"
                        value={taskValue.value}
                        onChange={(e) => setTaskValue((prev) => ({...prev, value: e.target.value}))}
                        placeholder="Add a new task"
                        onKeyDown={handleEnter}
                    />
                    <button onClick={() => setMoreSettings(true)}>More</button>
                </>
            )}
        </>
    );
}

export default TodoInput;