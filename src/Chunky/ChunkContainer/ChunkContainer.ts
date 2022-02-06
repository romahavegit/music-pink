import { IContainChunks } from "./IContainChuncks";
import { IShowContainingChunks } from "./IShowContainingChunks";

export class ChunkContainer<ChunkT> implements IContainChunks<ChunkT>, IShowContainingChunks<ChunkT>{
    chunks : ChunkT[] = [];
    isComplete : boolean = false;
    left : number;
    addChunk(chunk : ChunkT){
        if(this.isComplete){
            this.handleError(new Error("orgrigj"));
        } else{
            this.chunks.push(chunk);
            this.left--;
            if(this.left === 0){
                this.isComplete = true;
            }
        }
    }
    addChunks(chunks : ChunkT[]){
        const newLeft = this.left - chunks.length;
        if(this.isComplete || newLeft < 0){
            this.handleError(new Error("кпкщплкщплкщп"))
        } else {
            const newArray = [...this.chunks, ...chunks];
            this.left = newLeft;
            if(this.left === 0){
                this.isComplete = true;
            }
            this.chunks = newArray;
        }
    }
    constructor(private handleError : (err : Error)=>void, public length : number){
        this.left = length;
    }
}