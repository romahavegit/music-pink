import { DB } from "./DB";
import { IDB } from "./IDB";

export class DBFabric{
    constructDB<T>(storeName : string, collectionName : string) : IDB<T>{
        return new DB<T>(this.handleError, storeName, collectionName);
    }
    constructor(private handleError : (err : Error)=>void){

    }
}