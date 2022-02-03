import { IContainChunks } from "Chunky/ChunkFiller/IContainChuncks";

export class ChunkController<Chunk>{
    constructor(private chunkContainer : IContainChunks<Chunk>){

    }
}