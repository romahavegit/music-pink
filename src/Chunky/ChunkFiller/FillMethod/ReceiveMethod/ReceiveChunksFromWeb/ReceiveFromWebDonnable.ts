import { EventController } from "Velosipeds/EventController";
import { ICanDone } from "../ICanDone";
import { ICanReceiveChunks } from "../ICanReceiveChunks";
const DONE = "DONE"
export class ReceiveFromWebDonnable implements ICanDone, ICanReceiveChunks{
    private eventController = new EventController();
    private chunkReceiver : ICanReceiveChunks;
    private needDoneEmitting : boolean = false;
    addDoneListener(f: () => void): void {
        this.eventController.addEventListener(DONE, f);
    }
    removeDoneListener(f: () => void): void {
        this.eventController.removeEventListener(DONE, f);
    }
    startReceiveSession(): void {
        this.needDoneEmitting = true
        this.chunkReceiver.startReceiveSession();
    }
    endReceiveSession(): void {
        this.chunkReceiver.endReceiveSession();
        if(this.needDoneEmitting){
            this.eventController.emitEvent(DONE);
        }
        this.needDoneEmitting = false
    }
    constructor( receiveFromWebConstructor : (needChunkId : ()=>null | string)=>ICanReceiveChunks, needChunkId : ()=>null | string ){
        this.chunkReceiver = receiveFromWebConstructor(()=>{
            const newId = needChunkId();
            if(newId === null){
                this.endReceiveSession();
            }
            return newId;
        })
    }
}