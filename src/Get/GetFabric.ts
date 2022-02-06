import { Get, Protocol } from "./Get";
import { IGet } from "./IGet";

export type PathData = {
    endpointPath : string,
    itemName : string,
    protocol : Protocol, 
    port : number, 
    ip : string
}
export class GetFabric{
    constructGet<T>(fetchMethods : [(path : string)=>Promise<T>, (path : string)=>Promise<T[]>], pathData : PathData) : IGet<T>{
        return new Get(...fetchMethods, pathData.endpointPath, pathData.itemName, pathData.protocol, pathData.port, pathData.ip );
    }
}