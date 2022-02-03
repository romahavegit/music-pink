import { usePlayingTrack } from "features/music/selectors";
import { ITrack } from "features/music/state";
import { TrackDescription as Determinated } from "./TrackDescription";
export const TrackDescription = ()=>{
    const playingTrack : ITrack | null = usePlayingTrack();
    return <Determinated track = {playingTrack} />
}