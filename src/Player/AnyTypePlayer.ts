import { ICanPlay } from "./ICanPlay";
import { ITrackSettable } from "./ITrackSettable";

export class AnyTypePlayer<T> implements ICanPlay, ITrackSettable<T>{
    play = this.player.play.bind(this.player);
    pause = this.player.pause.bind(this.player);
    setTrack(newTrack: T): void {
        this.player.setTrack(this.constructType(newTrack));
    }
    constructor(
        private constructType : (arg : T)=>HTMLAudioElement,
        private player : ITrackSettable<HTMLAudioElement> & ICanPlay
    ){}
}