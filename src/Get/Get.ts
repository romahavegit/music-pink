import { IGet } from "./IGet";

export type Protocol = "http" | "https" | "ws" | "wss";
export class Get<Item> implements IGet<Item>{
    private uriFromId(id : string){
        const uri = `${this.protocol}://${this.ip}:${this.port}/${this.endpointPath}/${this.itemName}/${id}`;
        console.log(uri)
        return uri;
    }
    private uriFromCount(count? : number){
        return `${this.protocol}://${this.ip}:${this.port}/${this.endpointPath}/${this.itemName}${typeof count === "number" ? `?count=${count}` : ''}`
    }
    getItem(id : string){
        return this.fetchItem(this.uriFromId(id))
    }
    getItems(count?: number): Promise<Item[]> {
        return this.fetchItems(this.uriFromCount(count));
    }
    constructor(private fetchItem : (path : string)=>Promise<Item>, private fetchItems : (path : string)=>Promise<Item[]>, private endpointPath : string, private itemName : string, private protocol : Protocol, private port : number, private ip : string){}
}