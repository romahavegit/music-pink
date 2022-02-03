import { TrackList } from "сomponents/TrackList/TrackList"
import soundcloud from "icons/Soundcloud.svg";
import upload from "icons/Upload.svg";
import youtube from "icons/Youtube.svg";
import "./Menu.css"
import { ITrack } from "features/music/state";
export interface MenuProps{
    tracks : ITrack[]
}

export const Menu = (props : MenuProps)=>{
    const menu = getMenu(props)
    return(
        <div className="track_menu">
            <label className="my_songs_label">My songs</label>
            <div className="track_upload_panel">
                {menu.loadButtons}
                <div className="track_upload_button track_upload_label">
                    <label className="track_upload_label_text">add</label>
                </div>
            </div>
            {menu.trackList}
        </div>
    )
}

const getMenu = (props : MenuProps)=>({
    trackList : trackList(props),
    loadButtons : loadButtons()
})

const trackList = (props : MenuProps)=><TrackList tracks={props.tracks}/>
const loadButtons = ()=>[upload, soundcloud, youtube].map((icon, index)=>(
    <div key = {index} className="track_upload_button" role = "button">
        <img src={icon} alt = "upload button"/>
    </div>
))