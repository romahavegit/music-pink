import { ICanReceiveChunks } from "../ReceiveMethod/ICanReceiveChunks";
import { IFill } from "./IFill";

export class Filler<T> implements IFill{
    private receiver : ICanReceiveChunks;
    startFill(): void {
        this.receiver.startReceiveSession()
    }
    endFill(): void {
        this.receiver.endReceiveSession()
    }
    constructor(private receiverConstructor : (putChunks : (chunks : T[])=>void)=>ICanReceiveChunks, private putChunks : (chunks : T[])=>void) {
        this.receiver = receiverConstructor(putChunks);
    }
}