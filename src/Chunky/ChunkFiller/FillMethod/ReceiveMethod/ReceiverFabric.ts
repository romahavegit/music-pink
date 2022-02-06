import { DB } from "DB/DB";
import { FetchItemFabric } from "Get/FetchItemFabric";
import { GetFabric } from "Get/GetFabric";
import { IGet } from "Get/IGet";
import { ICanReceiveChunks } from "./ICanReceiveChunks";
import { ReceiveAllChunksFromDB } from "./ReceiveChunksFromDB/ReceiveAllChunksFromDB";
import { ReceiveFromDBDonnable } from "./ReceiveChunksFromDB/ReceiveFromDBDonnable";
import { ReceiveChunksFromWeb } from "./ReceiveChunksFromWeb/ReceiveChunksFromWeb";
import { ReceiveFromWebDonnable } from "./ReceiveChunksFromWeb/ReceiveFromWebDonnable";

export class ReceiverFabric{
    dbReceiver<T>(typename : string, 
        putChunksFromDB : (chunks : T[])=>void,
        ) : ICanReceiveChunks{
            const db = new DB<T>(this.handleError, "chunks", typename);
            const constructDBChunkReceiver = (
                putChunks : (chunk : T[])=> void
            )=> new ReceiveAllChunksFromDB(this.handleError, putChunks, db);
            const receiveChunksFromDB = new ReceiveFromDBDonnable<T>(constructDBChunkReceiver, putChunksFromDB);
            return receiveChunksFromDB;
        }
        constructGetReceiver<T>(
            putChunksFromWeb : (chunks : T[])=>Promise<void>, 
            get : IGet<T>,
            needChunkId : ()=>string | null) : ICanReceiveChunks{
                const receiveFromWebConstructor = (needChunkId : ()=>string | null)=>new ReceiveChunksFromWeb(
                    this.handleError,
                    putChunksFromWeb,
                    get,
                    needChunkId
                )
                const receiveChunksFromWeb = new ReceiveFromWebDonnable(receiveFromWebConstructor, needChunkId );
                return receiveChunksFromWeb;
        }
    constructor(private handleError : (err : Error)=>void){}
}