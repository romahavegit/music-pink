import { Get } from "Get/Get";
import { ICanReceiveChunks } from "../ICanReceiveChunks";

export class ReceiveChunksFromWeb<Chunk> implements ICanReceiveChunks{
    private isPutNeeded : boolean = false;
    private isSessionStarted : boolean = false;
    startReceiveSession(): void {
        if(this.isSessionStarted){
            this.handleError(new Error("AAAAAAAAAAAA"))
        }
        this.isPutNeeded = true;
        this.getOneInstance()
    }
    private getOneInstance(){
        console.log("this", this)
        if(this.needChunkId !== null){
            this.get.getItem(this.needChunkId()).then((chunk)=>{
                if(this.isPutNeeded){
                    this.putChunks([chunk]).then(this.getOneInstance.bind(this))
                }
            }); 
        }
    }
    endReceiveSession(): void {
        this.isPutNeeded = false;
    }
    constructor(private handleError : (err : Error)=>void, private putChunks : (chunks : Chunk[])=>Promise<void>, private get : Get<Chunk>, private needChunkId : ()=>string){}
}