import { ITrack } from "features/music/state";
import { TrackBrick } from "сomponents/TrackBrick/TrackBrick"
import "./TrackList.css";
export interface TrackListProps{
    tracks : ITrack[];
}

export const TrackList = (props : TrackListProps)=>{
    const tracks = getTracks(props)
    return(
        <ul className="track_list">
            {tracks}
        </ul>
    )
}

const getTracks = (props : TrackListProps)=>props.tracks.map(
    (track : ITrack)=><TrackBrick key = {track.id} track = {track}/>
)