import { nanoid } from "@reduxjs/toolkit";
import { ITrack, MusicState } from "./state";
const playingId = nanoid()
const notPlaying : ITrack[] = [1,2,3,4,5,6,7,8,9,10].map(()=>({
    id : nanoid(),
    info : {
        name : "Track Name",
        author : "Track Author",
        duration : 4 * 60 + 25,
        cover : "",
        description : "lol"
    },
    playingInfo : {
        isPlaying : false,
        duration : 5,
        onPause : false
    }
}))
export const initialState : MusicState = {
    tracks : [
        {
            id : playingId,
            info : {
                name : "Track Name",
                author : "Track Author",
                duration : 4 * 60 + 15,
                cover : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/song-cover-poster-template-65009075786d2df755374c269922761f_screen.jpg?ts=1561494322",
                description : "gavno"
            },
            playingInfo : {
                isPlaying : true,
                onPause : false,
                duration : 2 * 60 + 25
            }
        },
        ...notPlaying
    ],
    playingQueue : {
        isPlaying : true,
        playingId,
        playingQueyeIds : [playingId]
    }
}