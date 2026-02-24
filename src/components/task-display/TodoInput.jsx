import TaskSettings from "./TaskSettings";
import {useState} from "react";
import {newTaskID, getDataClone} from '../../shared/functions.js'

function TodoInput({taskData, listName, setTaskData}) {
    const [taskValue, setTaskValue] = useState(() => {
        return {
            value: "",
            id: newTaskID(taskData),
            date: Date(),
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
                date: Date(),
                repeat: "none"
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