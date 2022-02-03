import { AnyTypePlayer } from "./AnyTypePlayer";
import { Player } from "./Player";

const audioFromFile = (file : File) : HTMLAudioElement =>{
    return new Audio(URL.createObjectURL(file));
}
const audioFromString = (str : string) : HTMLAudioElement =>{
    return new Audio(str);
}

export class PlayerFabric{
    constructFilePlayer() : AnyTypePlayer<File>{
        return new AnyTypePlayer(audioFromFile, new Player(this.handleError))
    }
    constructUriPlayer() : AnyTypePlayer<string>{
        return new AnyTypePlayer(audioFromString, new Player(this.handleError));
    }
    constructor(private handleError : (msg : string)=>void){}
}