import {useState} from "react";

function TaskSettings({onClose, onSubmit}) {
    const [settings, setSettings] = useState({
        date: Date(),
        repeat: "none"
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
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>

            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSubmit}>Done</button>
            </div>
        </>
    )
}

export default TaskSettings;