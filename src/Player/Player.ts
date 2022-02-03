import { ICanPlay } from "./ICanPlay";
import { ITrackSettable } from "./ITrackSettable";

export class Player implements ITrackSettable<HTMLAudioElement>, ICanPlay{
    private track : HTMLAudioElement | null = null
    setTrack(newTrack: HTMLAudioElement): void {
        this.track?.pause();
        this.track = newTrack;
    }
    play(): void {
        if(!this.track){
            this.handleError(new Error("ъеъ"))
        }
        this.track?.play();
    }
    pause(): void {
        if(!this.track){
            this.handleError(new Error("ъуъ"))
        }
        this.track?.pause();
    }
    constructor(private handleError : (msg : Error)=>void){ }
}

