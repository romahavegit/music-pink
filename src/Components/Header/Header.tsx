import "./Header.css";
import {APP_NAME} from "@constants"
import note_icon from "@icons/Note.svg";
export const Header = ()=>(
    <header>
        <img alt = "app logo" src = {note_icon}/>
        <p className = "app_name">{APP_NAME}</p>
    </header>
)
