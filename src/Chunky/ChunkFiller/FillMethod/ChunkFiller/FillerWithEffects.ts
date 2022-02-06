import { IFill } from "./IFill";
import { IMakeEffects } from "./IMakeEffects";

export class FillerWithEffects<T> implements IMakeEffects<T>, IFill{
    private receiveListeners : ((chunks : T[])=>void)[] = [];
    private filler : IFill;
    addReceiveEventListener(f: (chunks: T[]) => void): void {
        this.receiveListeners.push(f);
    }
    removeReceiveListener(f: (chunks: T[]) => void): void {
        this.receiveListeners.filter(g => g !== f);
    }
    startFill(): void {
        this.filler.startFill()
    }
    endFill(): void {
        this.filler.endFill()
    }
    constructor(fillerConstructor : (putChunks : (chunks : T[])=>void)=>IFill, putChunks : (chunks : T[])=>void){
        this.filler = fillerConstructor((chunks : T[])=>{
            putChunks(chunks);
            this.receiveListeners.forEach(f=>f(chunks));
        })
    }
}