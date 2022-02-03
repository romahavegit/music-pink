import { EventController } from "Velosipeds/EventController";
import { IContainChunks } from "./IContainChuncks";
import { CHUNKS_ADDED, CHUNK_CONTAINER_FILLED, IHaveChunkEvents } from "./IHaveChunkEvents";
import { IShowContainingChunks } from "./IShowContainingChunks";

export class EventbleChunkContainer<Chunk> implements IHaveChunkEvents, IContainChunks<Chunk>{
    private eventController = new EventController();
    private isCompleteEmited : boolean = false;
    addEventListener = this.eventController.addEventListener.bind(this.eventController);
    addChunk(chunk: Chunk): void {
        this.makeAddOp(()=>this.chunkContainer.addChunk(chunk));
    }
    addChunks(chunks: Chunk[]): void {
        this.makeAddOp(()=>this.chunkContainer.addChunks(chunks));
    }
    private makeAddOp(f : ()=>void){
        const oldLeft = this.chunkContainer.left;
        f();
        const newLeft = this.chunkContainer.left;
        if(oldLeft > newLeft){
            this.eventController.emitEvent(CHUNKS_ADDED);
        }
        if(this.chunkContainer.isComplete && !this.isCompleteEmited){
            this.eventController.emitEvent(CHUNK_CONTAINER_FILLED);
            this.isCompleteEmited = true;
        }
    }
    get left(){
        return this.chunkContainer.left;
    }
    get isComplete(){
        return this.chunkContainer.isComplete;
    }
    constructor(private chunkContainer : IContainChunks<Chunk> & IShowContainingChunks<Chunk>){ }
}