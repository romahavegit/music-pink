export type MusicState = {
    tracks : ITrack[]
    playingQueue : IPlayingQueue
}
export type TrackInfo = {
    name : string;
    author : string;
    duration : number;
    description : string;
    cover : string;
}

export type PlayingInfo = {
    isPlaying : boolean;
    duration : number;
    onPause : boolean;
}
export type ITrack = {
    id : string;
    info : TrackInfo;
    playingInfo : PlayingInfo
}

export type DontPlayingQueue = {
    isPlaying : false;
}

export type IsPlayingQueue = {
    isPlaying : true;
    playingId : string;
    playingQueyeIds : string[];
}
export type IPlayingQueue = DontPlayingQueue | IsPlayingQueue;
