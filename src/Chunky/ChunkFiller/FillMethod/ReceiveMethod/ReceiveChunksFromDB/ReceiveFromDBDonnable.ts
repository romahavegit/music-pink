import { EventController } from "Velosipeds/EventController";
import { ICanDone } from "../ICanDone";
import { ICanReceiveChunks } from "../ICanReceiveChunks";
const DONE = "done"
export class ReceiveFromDBDonnable<Chunk> implements ICanDone, ICanReceiveChunks{
    private eventController = new EventController();
    private chunkReceiver : ICanReceiveChunks;
    private isDoneEmitNeeded : boolean = false;
    addDoneListener(f: () => void): void {
        this.eventController.addEventListener(DONE, f)
    }
    removeDoneListener(f: () => void): void {
        this.eventController.removeEventListener(DONE,f);
    }
    startReceiveSession(): void {
        this.isDoneEmitNeeded = true;
        this.chunkReceiver.startReceiveSession()
    }
    endReceiveSession(): void {
        this.chunkReceiver.endReceiveSession();
        if(this.isDoneEmitNeeded){
            this.eventController.emitEvent(DONE);
        }
        this.isDoneEmitNeeded = false;
    }
    constructor(constructChunkReceiver : (putChunks : (chunk : Chunk[])=>void)=>ICanReceiveChunks, putChunks : (chunk : Chunk[])=>void){
        this.chunkReceiver = constructChunkReceiver((chunks : Chunk[])=>{
            putChunks(chunks);
            this.endReceiveSession();
        })
    }
}