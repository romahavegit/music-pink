import { ICanPlay } from "Player/ICanPlay";
import { ITrackSettable } from "Player/ITrackSettable";

export interface IAudio{
    startLocalReceiving() : void;
    endLocalReceiving () : void;

    startReceivingFromWeb() : void;
    endReceivingFromWeb() : void;

    play(player : ITrackSettable<File> & ICanPlay) : void;
    pause(player : ICanPlay) : void;
}