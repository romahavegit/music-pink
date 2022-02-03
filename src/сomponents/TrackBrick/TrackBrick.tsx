import PlayIcon from "icons/Play.svg";
import PauseIcon from "icons/Pause.svg";
import "./TrackBrick.css";
import React from "react";
import { ITrack } from "features/music/state";

export interface TrackBrickProps{
    track : ITrack
}



export const TrackBrick = React.memo((props : TrackBrickProps)=>{
    console.log(`render trackbrick with title :${props.track.info.name} and id: ${props.track.id}`)
    const track = propsToTrack(props);
    return (
        <li className = "track_brick">
            <div className={track.className}>
                <img alt = "music icon" src = {track.icon}/>
            </div>
            <track.bar>
                <p className="brick_track_name">{track.title}</p>
                <p className="brick_track_duration">{track.duration}</p>
            </track.bar>
        </li>
)})

const propsToTrack = (props : TrackBrickProps)=>({
    id : props.track.id,
    icon : icon(props),
    bar : bar(props),
    title : props.track.info.name,
    duration : duration(props),
    className : `play_and_pause_button ${props.track.playingInfo.isPlaying ? "selected_track_button" : "not_selected_track_button"}`
})

const icon = (props : TrackBrickProps)=>props.track.playingInfo.onPause || !props.track.playingInfo.isPlaying ? PlayIcon : PauseIcon
const bar = (props : TrackBrickProps)=>(innerProps : any)=>(
    <div 
        className = "brick_track_info"
        style = {{background : props.track.playingInfo.isPlaying ? `linear-gradient(90deg, var(--primary-dark) ${100*props.track.playingInfo.duration / props.track.info.duration}%, var(--primary) ${100 - 100*props.track.playingInfo.duration / props.track.info.duration}%)` : 'var(--secondary)'}}>
            {innerProps.children}
    </div>
)
export const duration = (props : TrackBrickProps)=>{
    const duration = props.track.playingInfo.isPlaying ? props.track.playingInfo.duration : props.track.info.duration;
    const remains = duration % 60;
    return `${Math.floor(duration/60 )}:${remains < 10 ? "0" : ""}${remains.toString()}`
}