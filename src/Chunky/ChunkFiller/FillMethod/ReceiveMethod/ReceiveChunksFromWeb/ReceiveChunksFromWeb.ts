import { IGet } from "Get/IGet";
import { ICanReceiveChunks } from "../ICanReceiveChunks";

export class ReceiveChunksFromWeb<Chunk> implements ICanReceiveChunks{
    private isPutNeeded : boolean = false;
    private isSessionStarted : boolean = false;
    startReceiveSession(): void {
        if(this.isSessionStarted){
            this.handleError(new Error("AAAAAAAAAAAA"))
        }
        this.isPutNeeded = true;
        this.isSessionStarted = true;
        this.getOneInstance()
    }
    private getOneInstance(){
        const nextId = this.needChunkId() 
        if(nextId !== null){
            this.get.getItem(nextId).then((chunk)=>{
                if(this.isPutNeeded){
                    this.putChunks([chunk]).then(this.getOneInstance.bind(this))
                }
            }); 
        }
    }
    endReceiveSession(): void {
        this.isPutNeeded = false;
    }
    constructor(private handleError : (err : Error)=>void, private putChunks : (chunks : Chunk[])=>Promise<void>, private get : IGet<Chunk>, private needChunkId : ()=>string | null){}
}