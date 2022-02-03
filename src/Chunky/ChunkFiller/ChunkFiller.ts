import { IFillChunks } from "./IFillChunks";

export class ChunkFiller<Get, Chunk> implements IFillChunks{
    constructor(private handleError : (err : Error)=>void) {}
}