import { useContext } from "react"
import {AppContext} from "../utils/AppContext.js";

function Header() {
    const [settings] = useContext(AppContext)
    return (
        <>
            <h1>{settings.currentList}</h1>
        </>
    )
}

export default Header