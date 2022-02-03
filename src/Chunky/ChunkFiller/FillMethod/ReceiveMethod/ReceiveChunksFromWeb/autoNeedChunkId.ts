import { ChunkContainer } from "Chunky/ChunkContainer/ChunkContainer"

export const autoNeedChunkId = (state : ChunkContainer<any>)=>()=>(state.chunks.length + 1).toString()
