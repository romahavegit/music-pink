import { ChunkContainer } from "./ChunkContainer";
import { EventbleChunkContainer } from "./EventbleChunkContainer";

export class ChunkContainerFabric{
    constructEventbleContainer<T>(length : number){
        return new EventbleChunkContainer(new ChunkContainer<T>(this.errorHandler, length));
    }
    constructor(private errorHandler : (err : Error)=>void){}
}