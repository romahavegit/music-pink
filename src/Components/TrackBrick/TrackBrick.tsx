import PlayIcon from "@icons/Play.svg";
import PauseIcon from "@icons/Pause.svg";
import "./TrackBrick.css";
import React from "react";


export interface TrackBrickProps{
    icon : string;
    bar : React.FunctionComponent
    title : string;
    duration : string;
}
export const TrackBrick = (props : TrackBrickProps)=>(
    <li className = "track_brick">
        //add custom bg color
        <div className="play_and_pause_button">
            <img src = {props.icon}/>
        </div>
        <props.bar>
            <p className="brick_track_name">{props.title}</p>
            <p className="brick_track_duration">{props.duration}</p>
        </props.bar>
    </li>
)

export interface TrackBrickInitialProps{
    selected : boolean;
    onPause : boolean;
    duration : number;
    playingDuration : number;
}
export const icon = (props : TrackBrickInitialProps)=>props.onPause || !props.selected ? PlayIcon : PauseIcon


export const bar = (props : TrackBrickInitialProps)=>(innerProps : any)=><div className = "brick_track_info" style = {{background : `linear-gradient(90deg, var(--dark-primary) ${100*props.playingDuration / props.duration}%, var(--primary) ${100 - 100*props.playingDuration / props.duration}%);`}}>{innerProps.children}</div>

export const duration = (props : TrackBrickInitialProps)=>{
    const remains = props.playingDuration % props.duration;

    return `${Math.floor(props.playingDuration / props.duration)}:${remains < 10 ? "0" : ""}${remains.toString()}`
}