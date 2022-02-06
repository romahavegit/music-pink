import { CHUNKS_ADDED, IHaveChunkEvents } from "../IHaveChunkEvents";
import { IShowContainingChunks } from "../IShowContainingChunks";

export const constructContentEffect = <Chunk, Content>(e : IHaveChunkEvents & IShowContainingChunks<Chunk>, f : (arg : Chunk[])=>Content, putContent : (content : Content)=>void)=>{
    e.addEventListener(CHUNKS_ADDED, ()=>{
        const content : Content = f(e.chunks);
        putContent(content);
    })
}