import { IDB } from "./IDB";
const ACTUAL_VERSION = 1;
export class DB<Item> implements IDB<Item>{
    private request : IDBOpenDBRequest| null = null;
    private db : IDBDatabase | null = null;
    private transaction : IDBTransaction | null = null;
    private setDBAndExecute(f : ()=>void) : ()=>void{
        return ()=>{
            if(this.request){
                if(!this.db){
                    this.db = this.request.result;
                }
            } else{
                this.handleError(new Error("лщкщпкщпкщпвпвалпо"));
            }
            f();
        }
    }
    private setTransactionAndExecute( f : ()=>void, transactionMode : IDBTransactionMode ){
        return ()=>{
            if(!this.db){
                throw new Error("!!ТА БЛЯТЬ");
            }
            this.transaction = this.db.transaction(this.collectionName, transactionMode);
            f();
        }
    }
    private onupgradeneeded(){
        if(!this.db){
            throw new Error("!!БЛЯТЬ, НЕ ПО ПЛАНУ")
        }
        if(this.db.version < ACTUAL_VERSION && this.db.version !== 0){
            this.handleError(new Error("ЮЛЯТЬ, ОБНОВЛЕНИЕ DB ПРОЕБАЛ"));
        }
        if(!this.db.objectStoreNames.contains(this.collectionName)){
            this.db.createObjectStore(this.collectionName, {keyPath: 'id'});
        }
    }
    private passMessage(f : ()=>void, mode : IDBTransactionMode){
        this.request = indexedDB.open(this.storeName, ACTUAL_VERSION);
        this.request.onupgradeneeded = this.setDBAndExecute(this.onupgradeneeded.bind(this));
        this.request.onerror = (err : Event)=>{ this.handleError(new Error(err.toString())) }
        this.request.onsuccess = this.setDBAndExecute(this.setTransactionAndExecute(f, mode));
    }
    setItem(id: string, item: Item): Promise<void> {
        return new Promise(done=>{
            this.passMessage(()=>{
                if(!this.transaction){
                    throw new Error("m?")
                }
                const collection = this.transaction.objectStore(this.collectionName);
                collection.put(item).onsuccess = ()=>done();
            }, "readwrite")
        })
    }
    getItem(id: string): Promise<Item>{
        return new Promise(resolve=>{
            this.passMessage(()=>{
                if(!this.transaction){
                    throw new Error("!!m?")
                }
                const collection = this.transaction.objectStore(this.collectionName)
                const req = collection.get(id)
                req.onsuccess = ()=>resolve(req.result);
            }, "readonly")
        })
    }
    getItems(count?: number): Promise<Item[]>{
        return new Promise(resolve=>{
            this.passMessage(()=>{
                if(!this.transaction){
                    throw new Error("!!mm?")
                }
                const collection = this.transaction.objectStore(this.collectionName);
                const req = collection.getAll(null, count);
                req.onsuccess = ()=>resolve(req.result);

            }, "readonly")
        })
    }
    constructor(private handleError : (err : Error)=>void, private storeName : string, private collectionName : string) {}
}