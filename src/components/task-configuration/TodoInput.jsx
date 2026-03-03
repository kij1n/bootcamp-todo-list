import TaskSettings from "./TaskSettings.jsx";
import {useContext, useState} from "react";
import {RepeatType} from "../../utils/enums.js";
import {AppContext} from "../../utils/AppContext.js";
import {getToday} from "../../utils/functions.js";

function TodoInput() {
    const {addTodo, settings} = useContext(AppContext)

    const [moreSettings, setMoreSettings] = useState(false);
    const [taskValue, setTaskValue] = useState(() => {
        return {
            value: "",
            date: getToday(),
            repeat: RepeatType.NONE
        }
    })

    const handleEnter = (event) => {
        if (event.key === 'Enter' && taskValue.value !== '') {
            addTodo(taskValue, settings.currentList)
            setTaskValue({
                value: "",
                date: getToday(),
                repeat: RepeatType.NONE
            })
        }
    };
    const handleSettingsSubmit = (settingsData) => {
        setTaskValue({
            date: new Date(settingsData.date).setHours(0, 0, 0, 0),
            repeat: settingsData.repeat,
            priority: settingsData.priority
        })
        setMoreSettings(false)
    };

    return (
        <>
            {moreSettings ? (
                <TaskSettings
                    onClose={() => setMoreSettings(false)}
                    onSubmit={(settingsData) => handleSettingsSubmit(settingsData)}
                />
            ) : (
                <div className="flex flex-row gap-2 py-2 px-3 rounded w-full">
                    <input
                        type="text"
                        id="newTask"
                        value={taskValue.value}
                        onChange={(e) => setTaskValue((prev) => ({...prev, value: e.target.value}))}
                        placeholder="Add a new task"
                        onKeyDown={handleEnter}
                        className="input w-full"
                    />
                    <button onClick={() => setMoreSettings(true)} className="button">More</button>
                </div>
            )}
        </>
    );
}

export default TodoInput;