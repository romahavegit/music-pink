import { useAppSelector } from "hooks";
import { RootState } from "store";
import { ITrack } from "./state";

export const usePlayingTrack : ()=>ITrack | null = ()=>useAppSelector((state : RootState)=>{
    const queue = state.music.playingQueue
    return !queue.isPlaying ? null : (
        state.music.tracks.filter(track=>track.id === queue.playingId)[0]      
    )
})

export const useTracks : ()=>ITrack[] = ()=>useAppSelector((state : RootState)=>state.music.tracks)