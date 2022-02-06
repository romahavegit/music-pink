import { EventController } from "Velosipeds/EventController";
import { ICanDone } from "../ICanDone";
import { ICanReceiveChunks } from "../ICanReceiveChunks";
const DONE = "done";
export class SerialReceiver implements ICanReceiveChunks, ICanDone{
    private eventController = new EventController()
    private isAllDone : boolean = false;
    private isAborted : boolean = false;
    private currentReceiverIndex : number = 0;
    startReceiveSession(): void {
        this.currentReceiverIndex = 0;
        this.isAllDone = false;
        this.isAborted = false;
        this.receivers[this.currentReceiverIndex].startReceiveSession();
    }
    endReceiveSession(): void {
        this.isAborted = true;
        this.receivers.forEach(receiver=>{
            receiver.endReceiveSession();
        })
    }
    addDoneListener(f: () => void): void {
        this.eventController.addEventListener(DONE, f);
    }
    removeDoneListener(f: () => void): void {
        this.eventController.removeEventListener(DONE, f);
    }
    constructor(private errorHandler : (err : Error)=>void, private receivers : (ICanReceiveChunks & ICanDone)[]) {
        if(receivers.length < 1){
            this.errorHandler(new Error("grgjrigjrigjrijg"))
        }
        receivers.forEach(receiver=>{
            receiver.addDoneListener(()=>{
                if(!this.isAborted){
                    this.currentReceiverIndex++;
                    const currentReceiver = this.receivers[this.currentReceiverIndex];
                    if(currentReceiver){
                        this.receivers[this.currentReceiverIndex - 1].endReceiveSession();
                        currentReceiver.startReceiveSession();
                    } else {
                        this.isAllDone = true;
                        this.eventController.emitEvent(DONE);
                    }
                }
            })
        })
    }
}