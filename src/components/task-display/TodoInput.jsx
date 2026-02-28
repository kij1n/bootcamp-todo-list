import TaskSettings from "./TaskSettings";
import {useContext, useState} from "react";
import {RepeatType} from "../../utils/enums.js";
import {AppContext} from "../../utils/AppContext.js";

function TodoInput() {
    const {addTodo, settings} = useContext(AppContext)

    const [moreSettings, setMoreSettings] = useState(false);
    const [taskValue, setTaskValue] = useState(() => {
        return {
            value: "",
            date: new Date(),
            repeat: RepeatType.NONE
        }
    })

    const handleEnter = (event) => {
        if (event.key === 'Enter' && taskValue.value !== '') {
            addTodo(taskValue, settings.currentList)
            setTaskValue({
                value: "",
                date: new Date(),
                repeat: RepeatType.NONE
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
            {moreSettings ? (
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