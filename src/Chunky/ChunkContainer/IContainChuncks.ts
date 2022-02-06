export interface IContainChunks<Chunk>{
    addChunk(chunk : Chunk) : void;
    addChunks(chunks : Chunk[]) : void;
    left : number;
    length : number;
    isComplete : boolean;
}