import { IHaveChunkEvents } from "Chunky/ChunkContainer/IHaveChunkEvents";
import { IShowContainingChunks } from "Chunky/ChunkContainer/IShowContainingChunks";
import { IDB } from "DB/IDB";

export const saveChunkEffect = <T>(e : IHaveChunkEvents & IShowContainingChunks<T>, db : IDB<T>)=>{
    e.addEventListener("CHUNKS_ADDED", ()=>{
        e.chunks.forEach((chunk)=>{
            db.setItem("",chunk);
        })
    })
}