import { checkArray } from "./checkArray";
import { fetchAndCheck } from "./fetchAndCheck";
import { getBlob } from "./getBlob";
import { serrializeBodyAndCheck } from "./serrializeBodyAndCheck";
const JSON = "json";
const BLOB = "blob";
export type BodyType = typeof JSON | typeof BLOB;
type Yes_CheckNeeded<T> = {
    isCheckNeeded : true,
    checkFunction : ( arg : unknown ) => arg is T
}
type No_CheckNeednt = {
    isCheckNeeded : false
}
//пиздец что за хуйню я в этом файле понаписал
export type IsCheckNeeded<T> = Yes_CheckNeeded<T> | No_CheckNeednt;
export class FetchItemFabric{
    private constructBlobReceiver(){
        return (path : string)=>fetchAndCheck<Blob>(this.BlobBodyReceiver(), path);
    }
    private constructJSONReceiver<T>(isCheckNeeded : IsCheckNeeded<T>){
        return (path : string)=>fetchAndCheck<T>(this.JSONBodyReceiver(isCheckNeeded), path);
    }
    private constructBlobsReceiver(){
        return (path : string)=>{
            throw new Error("ты шо еблан?")
        }
    }
    private constructJSONListReceiver<T>(isCheckNeeded : IsCheckNeeded<T>){
        const newCheckNeeded : IsCheckNeeded<T[]> = isCheckNeeded.isCheckNeeded ? {
            isCheckNeeded : true ,
            checkFunction : (arg : unknown) : arg is T[]=>checkArray<T>(isCheckNeeded.checkFunction, arg)} 
        : isCheckNeeded;
        return (path : string)=>fetchAndCheck<T[]>(this.JSONBodyReceiver<T[]>(newCheckNeeded), path)
    }
    private BlobBodyReceiver(){
        return getBlob;
    }
    private JSONBodyReceiver<T>(isCheckNeeded : IsCheckNeeded<T>){
        let checkF : (arg : unknown)=>arg is T;
                if(isCheckNeeded.isCheckNeeded){
                    checkF = isCheckNeeded.checkFunction;
                } else{
                    checkF = (arg : unknown) : arg is T=>true;
                }
        return (res : Response)=>serrializeBodyAndCheck(checkF, res);
    }
    constructBlobReceivers() : [(path : string)=>Promise<Blob>, (path : string)=>Promise<Blob[]>]{
        return [this.constructBlobReceiver(), this.constructBlobsReceiver()]
    }
    constructJSONReceivers<T>(isCheckNeeded : IsCheckNeeded<T>) : [(path : string)=>Promise<T>, (path : string)=>Promise<T[]>]{
        return [this.constructJSONReceiver<T>(isCheckNeeded), this.constructJSONListReceiver<T>(isCheckNeeded)]
    }
}