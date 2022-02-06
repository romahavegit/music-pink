import { ChunkContainer } from "Chunky/ChunkContainer/ChunkContainer";
import { ChunkDewrapper } from "Chunky/ChunkContainer/ChunkDewrapper";
import { saveChunkEffect } from "Chunky/ChunkContainer/effects/saveChunkEffect";
import { EventbleChunkContainer } from "Chunky/ChunkContainer/EventbleChunkContainer";
import { IShowContainingChunks } from "Chunky/ChunkContainer/IShowContainingChunks";
import { WrappedChunk } from "Chunky/ChunkContainer/WrappedChunk";
import { WrappedChunksContainer } from "Chunky/ChunkContainer/WrappedChunksContainer";
import { ICanReceiveChunks } from "Chunky/ChunkFiller/FillMethod/ReceiveMethod/ICanReceiveChunks";
import { ReceiveAllChunksFromDB } from "Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromDB/ReceiveAllChunksFromDB";
import { ReceiveFromDBDonnable } from "Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromDB/ReceiveFromDBDonnable";
import { ReceiveChunksFromWeb } from "Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromWeb/ReceiveChunksFromWeb";
import { APP_GET_API_PROTOCOL, AUDIO, AUDIO_GET_ENDPOINT, APP_PORT, APP_IP } from "constants/index";
import { DBFabric } from "DB/DBFabric";
import { FetchItemFabric } from "Get/FetchItemFabric";
import { GetFabric } from "Get/GetFabric";
import { IAudio } from "./IAudio";

export class Audio implements IAudio{
    private chunksContainer : IShowContainingChunks<Blob>;
    private dbChunkReceiver : ICanReceiveChunks;
    private webChunkReceiver : ICanReceiveChunks;
    private isReceivedFromDB : boolean = false;
    private calcContainerLengthBySize(size : number){
        const oneMb = 10 ** 6;
        const halfMb = oneMb / 2;
        const mbCount = Math.ceil(size / halfMb);
        return mbCount;
    }
    constructor(handleError : (err : Error)=>void, size : number, id : string){
        const dbFabric = new DBFabric(handleError);
        const db = dbFabric.constructDB<WrappedChunk<Blob>>("audio_chunks", id);
        const getFabric = new GetFabric();
        const fetchMethodsFabric = new FetchItemFabric();
        const blobReceivers = fetchMethodsFabric.constructBlobReceivers();
        const get = getFabric.constructGet(blobReceivers, {
            ip : APP_IP,
            port : APP_PORT,
            protocol : APP_GET_API_PROTOCOL,
            endpointPath : AUDIO_GET_ENDPOINT,
            itemName : AUDIO
        })
        const wrappedChunksContainer = new ChunkContainer<WrappedChunk<Blob>>(handleError, this.calcContainerLengthBySize(size));
        const eventbleContainer = new EventbleChunkContainer(wrappedChunksContainer);

        //for filling container
        const containerWrapper = new WrappedChunksContainer(eventbleContainer);
        //for showing chunks
        const chunkDewrapper = new ChunkDewrapper(wrappedChunksContainer);
        saveChunkEffect(eventbleContainer, db);
        const webReceiver = new ReceiveChunksFromWeb(handleError, (arg : Blob[])=>new Promise((done)=>{containerWrapper.addChunks(arg);done()}), get, ()=>wrappedChunksContainer.isComplete ? null : (wrappedChunksContainer.length - wrappedChunksContainer.left + 1).toString());
        const dbChunkReceiverConstructor =(putChunks : (arg : WrappedChunk<Blob>[])=>void)=>new ReceiveAllChunksFromDB<WrappedChunk<Blob>>(handleError, putChunks, db);
        const dbReceiverDonnable = new ReceiveFromDBDonnable(dbChunkReceiverConstructor, eventbleContainer.addChunks.bind(containerWrapper));
        this.webChunkReceiver = webReceiver;
        this.chunksContainer = chunkDewrapper;
        this.dbChunkReceiver = dbReceiverDonnable;
    }
}