import { IContainChunks } from "./IContainChuncks";
import { WrappedChunk } from "./WrappedChunk";

export class WrappedChunksContainer<T> implements IContainChunks<T>{
    private idByLeft(){
        return (this.chunkContainer.length - this.chunkContainer.left + 1).toString();
    }
    private wrap(body : T){
        return new WrappedChunk(body, this.idByLeft());
    }
    addChunk(chunk: T): void {
        this.chunkContainer.addChunk(this.wrap(chunk));
    }
    addChunks(chunks: T[]): void {
        this.chunkContainer.addChunks(chunks.map(chunk=>this.wrap(chunk)));
    }
    get left(){
        return this.chunkContainer.left
    }
    get length(): number{
        return this.chunkContainer.length
    }
    get isComplete(): boolean{
        return this.chunkContainer.isComplete;
    }

    constructor(private chunkContainer : IContainChunks<WrappedChunk<T>>){}
}