import { ICanReceiveChunks } from "./ICanReceiveChunks";

export class ReceiveChunkMethod implements ICanReceiveChunks{
    constructor(public startReceiveSession : ()=>void, public endReceiveSession : ()=>void) {}
}