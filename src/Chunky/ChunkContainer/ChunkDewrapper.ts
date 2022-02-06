import { IShowContainingChunks } from "./IShowContainingChunks";
import { WrappedChunk } from "./WrappedChunk";

export class ChunkDewrapper<T> implements IShowContainingChunks<T>{
    get chunks(): T[]{
        return this.chunkContainer.chunks.map(wrapped=>wrapped.body);
    }
    constructor(private chunkContainer : IShowContainingChunks<WrappedChunk<T>>) {}
}