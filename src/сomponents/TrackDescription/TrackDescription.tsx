import { ITrack } from "features/music/state";
import "./TrackDescription.css"

interface TrackDescriptionProps{
    track : ITrack | null;
}
export const TrackDescription = (props : TrackDescriptionProps)=>{
    const description = calc(props)
    return(
        <div className={description.className}>
            { description.content } 
        </div>
    )
}

const calc = (props : TrackDescriptionProps)=>({
    content : content(props),
    className : className(props)
})

const className = (props : TrackDescriptionProps)=> `track-description ${props.track ? 'have-playing-track' : 'havent-playing-track'}`
const calcForContent = (propsTrack : ITrack)=>({
    lasts : lasts(propsTrack),
    ...propsTrack.info
})

const content = (props : TrackDescriptionProps)=>{
    const propsTrack = props.track;
    if(propsTrack){
        const track = calcForContent(propsTrack);
        return(
            <>
                <p className="name_of_describing_track">{track.name}</p>
                <p className="author_of_describing_track">{track.author}</p>
                <p className="duration_of_describing_track">{`lasts ${track.lasts}`}</p>
                <img className="track-cover" alt = {`${track.name} cover`} src={track.cover}/>
                <p className="description_of_describing_track">{track.description}</p>
            </>
        )
    }
    else{
        return(
            <></>
        )
    }
}



const lasts = (propsTrack : ITrack)=>{
    const remains = propsTrack.info.duration % 60;
    return `${Math.floor(propsTrack.info.duration/60)}:${remains < 10 ? "0" : ""}${remains}`
}