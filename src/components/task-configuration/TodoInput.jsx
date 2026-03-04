import TaskSettings from "./TaskSettings.jsx";
import {useContext, useState} from "react";
import {RepeatType, Priority} from "../../utils/enums.js";
import {AppContext} from "../../utils/AppContext.js";
import {getToday} from "../../utils/functions.js";

function TodoInput() {
    const {addTodo, settings} = useContext(AppContext)

    const [moreSettings, setMoreSettings] = useState(false);
    const [taskValue, setTaskValue] = useState({
        value: "",
        date: getToday(),
        repeat: RepeatType.NONE,
        priority: Priority.LOW
    })

    const handleEnter = (event) => {
        if (event.key === 'Enter' && taskValue.value !== '') {
            addTodo(taskValue, settings.currentList)
            setTaskValue({
                value: "",
                date: getToday(),
                repeat: RepeatType.NONE,
                priority: Priority.LOW
            })
        }
    };
    const handleSettingsSubmit = (settingsData) => {
        const date = settingsData.date ?? getToday();
        date.setHours(0, 0, 0, 0);
        setTaskValue({
            ...taskValue,
            date,
            repeat: settingsData.repeat ?? RepeatType.NONE,
            priority: settingsData.priority ?? Priority.LOW
        })
        console.log(settingsData)
        console.log(taskValue)
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
                <div className="flex flex-row gap-2 py-2 px-3 rounded w-full shrink-0">
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