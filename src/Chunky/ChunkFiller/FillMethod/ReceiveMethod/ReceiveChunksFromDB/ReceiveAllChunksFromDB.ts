import { DB } from "DB/DB";
import { ICanReceiveChunks } from "../ICanReceiveChunks";
export class ReceiveAllChunksFromDB<Chunk> implements ICanReceiveChunks{
    private isPutNeeded : boolean = false;
    private isSessionStarted : boolean = false;
    startReceiveSession(): void {
        if(this.isSessionStarted){
            this.handleError(new Error("AAAAAAAAAAAA"))
        }
        this.isPutNeeded = true;
        this.db.getItems().then((chunks)=>{
            if(this.isPutNeeded){
                this.putChunks(chunks)
            }
        });
    }
    endReceiveSession(): void {
        this.isPutNeeded = false;
    }
    constructor(private handleError : (err : Error)=>void, private putChunks : (chunks : Chunk[])=>void, private db : DB<Chunk>){}
}