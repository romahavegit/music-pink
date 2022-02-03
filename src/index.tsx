import { ChunkContainer } from 'Chunky/ChunkContainer/ChunkContainer';
import { ReceiveAllChunksFromDB } from 'Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromDB/ReceiveAllChunksFromDB';
import { autoNeedChunkId } from 'Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromWeb/autoNeedChunkId';
import { ReceiveChunksFromWeb } from 'Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromWeb/ReceiveChunksFromWeb';
import { DB } from 'DB/DB';
import { getSource } from 'Get/GetSource';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const handleError = (err : Error)=>{throw(err)}

const webSource = getSource<BoolChunk>((arg : unknown) : arg is BoolChunk=>(typeof arg === "object" && arg !== null && "isTrue" in arg && "id" in arg), "chunks", "bool/1");
const store = new DB<BoolChunk>(((err : Error)=>{throw err}), "chunks", "bool");

const chunkContainer = new ChunkContainer<BoolChunk>(handleError, 4);
type BoolChunk = {id : string, isTrue : boolean};
const receiveChunksFromDB = new ReceiveAllChunksFromDB(handleError, (chunks : BoolChunk[])=>chunkContainer.addChunks(chunks), store);
const receiveChunksFromWeb = new ReceiveChunksFromWeb(handleError, (chunks : BoolChunk[])=>new Promise((done)=>{chunkContainer.addChunks(chunks);chunkContainer.isComplete ? receiveChunksFromWeb.endReceiveSession() : null;done()}), webSource, autoNeedChunkId(chunkContainer) );

(window as any).webSource = webSource;
(window as any).rdb = receiveChunksFromDB;
(window as any).receiveChunksFromWeb = receiveChunksFromWeb;
(window as any).chunkContainer = chunkContainer;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);