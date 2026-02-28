import {useState} from "react";
import {Priority, RepeatType} from "../../utils/enums.js";

function TaskSettings({onClose, onSubmit}) {
    const [settings, setSettings] = useState({
        date: new Date(),
        repeat: RepeatType.NONE,
        priority: Priority.NONE
    })

    const handleSubmit = () => {
        onSubmit(settings)
    }

    return (
        <>
            <input
                type="date"
                value={settings.date}
                onChange={(e) => setSettings({...settings, date: e.target.value})}
            />
            <select
                name="repeat"
                id="select-repeat"
                value={settings.repeat}
                onChange={(e) => setSettings({...settings, repeat: e.target.value})}
            >
                <option value={RepeatType.NONE}>None</option>
                <option value={RepeatType.DAILY}>Daily</option>
                <option value={RepeatType.WEEKLY}>Weekly</option>
                <option value={RepeatType.MONTHLY}>Monthly</option>
                <option value={RepeatType.YEARLY}>Yearly</option>
            </select>
            <select
                name="priority"
                id="priority-select"
                value={settings.priority}
                onChange={(e) => setSettings({...settings, priority: e.target.value})}
            >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
            </select>

            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSubmit}>Done</button>
            </div>
        </>
    )
}

export default TaskSettings;