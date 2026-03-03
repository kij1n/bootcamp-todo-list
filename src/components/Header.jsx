import { useContext } from "react"
import {AppContext} from "../utils/AppContext.js";

function Header() {
    const {settings} = useContext(AppContext)
    return (
        <>
            <h1 className="text-3xl font-bold text-white p-4 shrink-0">{settings.currentList}</h1>
        </>
    )
}

export default Header