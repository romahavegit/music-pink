import { IHaveEvents } from "Velosipeds/IHaveEvents";

export const CHUNKS_ADDED = "CHUNKS_ADDED";
export const CHUNK_CONTAINER_FILLED = "CHUNK_CONTAINER_FILLED";
export type ChunkEvents = typeof CHUNKS_ADDED | typeof CHUNK_CONTAINER_FILLED;
export type IHaveChunkEvents = IHaveEvents<ChunkEvents>;