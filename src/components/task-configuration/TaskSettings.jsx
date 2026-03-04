import {useState} from "react";
import {Priority, RepeatType} from "../../utils/enums.js";

function TaskSettings({onClose, onSubmit}) {
    const [settings, setSettings] = useState({
        date: new Date(),
        repeat: RepeatType.NONE,
        priority: Priority.LOW
    })

    const handleSubmit = () => {
        onSubmit(settings)
    }

    return (
        <div id="test" className="flex flex-row justify-between gap-4 py-2 px-4 bg-gray-700 rounded-2xl w-[calc(100%-2.5rem)] self-center">
            <div  className="flex flex-row gap-4 p-0">
                <label htmlFor="date" className="sr-only">Due date</label>
                <input
                    type="date"
                    value={settings.date}
                    onChange={(e) => setSettings({...settings, date: new Date(e.target.value)})}
                />
                <label htmlFor="select-repeat" className="sr-only">Repeat</label>
                <select
                    name="repeat"
                    id="select-repeat"
                    value={settings.repeat}
                    onChange={(e) => setSettings({...settings, repeat: e.target.value})}
                    className="combo"
                >
                    <option value={RepeatType.NONE}>None</option>
                    <option value={RepeatType.DAILY}>Daily</option>
                    <option value={RepeatType.WEEKLY}>Weekly</option>
                    <option value={RepeatType.MONTHLY}>Monthly</option>
                    <option value={RepeatType.YEARLY}>Yearly</option>
                </select>
                <label htmlFor="priority-select" className="sr-only">Priority</label>
                <select
                    name="priority"
                    id="priority-select"
                    value={settings.priority}
                    onChange={(e) => setSettings({...settings, priority: Number(e.target.value)})}
                    className="combo"
                >
                    {/* <option value={Priority.NONE}>None</option> */}
                    <option value={Priority.LOW}>Low</option>
                    <option value={Priority.MEDIUM}>Medium</option>
                    <option value={Priority.HIGH}>High</option>
                </select>
            </div>
            <div className="flex flex-row gap-2 p-0">
                <button onClick={onClose} className="button">Cancel</button>
                <button onClick={handleSubmit} className="button">Done</button>
            </div>
        </div>
    )
}

export default TaskSettings;