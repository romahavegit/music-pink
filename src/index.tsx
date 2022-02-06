import { ChunkContainer } from 'Chunky/ChunkContainer/ChunkContainer';
import { IContainChunks } from 'Chunky/ChunkContainer/IContainChuncks';
import { ReceiveAllChunksFromDB } from 'Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromDB/ReceiveAllChunksFromDB';
import { ReceiveFromDBDonnable } from 'Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromDB/ReceiveFromDBDonnable';
import { ReceiveChunksFromWeb } from 'Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromWeb/ReceiveChunksFromWeb';
import { ReceiveFromWebDonnable } from 'Chunky/ChunkFiller/FillMethod/ReceiveMethod/ReceiveChunksFromWeb/ReceiveFromWebDonnable';
import { SerialReceiver } from 'Chunky/ChunkFiller/FillMethod/ReceiveMethod/SerialReceiver/SerialReceiver';
import { DB } from 'DB/DB';
import { getSource } from 'Get/GetSource';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const handleError = (err : Error)=>{throw(err)}
const autoNeedChunkId = <Chunk,>(container : IContainChunks<Chunk>)=>()=>container.isComplete ? null : (container.length - container.left + 1).toString();

const webSource = getSource<BoolChunk>((arg : unknown) : arg is BoolChunk=>(typeof arg === "object" && arg !== null && "isTrue" in arg && "id" in arg), "chunks", "bool/1");
const store = new DB<BoolChunk>(((err : Error)=>{throw err}), "chunks", "bool");

const chunkContainer = new ChunkContainer<BoolChunk>(handleError, 13);
type BoolChunk = {id : string, isTrue : boolean};
const receiveChunksFromDB = new ReceiveAllChunksFromDB(handleError, (chunks : BoolChunk[])=>chunkContainer.addChunks(chunks), store);
const receiveChunksFromWeb = new ReceiveChunksFromWeb(handleError, (chunks : BoolChunk[])=>new Promise((done)=>{chunkContainer.addChunks(chunks);chunkContainer.isComplete ? receiveChunksFromWeb.endReceiveSession() : null;done()}), webSource, autoNeedChunkId(chunkContainer) );

const receiveChunksWebWithEvent = new ReceiveFromWebDonnable(
  (needChunkId : ()=>string | null)=>new ReceiveChunksFromWeb(handleError, (chunks : BoolChunk[])=>
    new Promise((done)=>{
    chunkContainer.addChunks(chunks);
    chunkContainer.isComplete ? receiveChunksFromWeb.endReceiveSession() : null;
    done()}),
    webSource,needChunkId ), autoNeedChunkId(chunkContainer));

  
const receiveChunksFromDBWithEvent = new ReceiveFromDBDonnable<BoolChunk>((putChunks : (chunks : BoolChunk[])=>void)=>new ReceiveAllChunksFromDB(handleError, putChunks, store), (chunks : BoolChunk[])=>chunkContainer.addChunks(chunks));


const bothReceivers = new SerialReceiver(handleError, [receiveChunksFromDBWithEvent, receiveChunksWebWithEvent] );
(window as any).bothReceivers = bothReceivers;
(window as any).webSource = webSource;
(window as any).rdb = receiveChunksFromDB;
(window as any).receiveChunksFromWeb = receiveChunksFromWeb;
(window as any).chunkContainer = chunkContainer;

function sliceFile(file : any, chunksAmount : any) {
  var byteIndex = 0;
  var chunks = [];
    
  for (var i = 0; i < chunksAmount; i += 1) {
    var byteEnd = Math.ceil((file.size / chunksAmount) * (i + 1));
    chunks.push(file.slice(byteIndex, byteEnd));
    byteIndex += (byteEnd - byteIndex);
  }

  return chunks;
}

(window as any).sliceFile = sliceFile
const input = document.createElement("input");
input.type = "file";
document.body.appendChild(input);
(window as any).input = input;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);