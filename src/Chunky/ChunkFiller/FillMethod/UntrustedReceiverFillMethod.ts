import { IFillMethod } from "./IFillMethod";
import { ICanReceiveChunks } from "./ReceiveMethod/ICanReceiveChunks";

export class UntrustedReceiverFillMethod<Chunk> implements IFillMethod{
    constructor(receiveMethod : ()=>ICanReceiveChunks){}
}