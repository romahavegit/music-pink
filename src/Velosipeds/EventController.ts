type F = ()=>void
export class EventController{
    private eventListeners : Map<string, F[]> = new Map()
    addEventListener(name : string, f : F){
        if(!this.eventListeners.has(name)){
            this.eventListeners.set(name, [])
        }

        this.eventListeners.get(name)?.push(f);
    }
    removeEventListener(name : string, f : F){
        const listeners = this.eventListeners.get(name)

        this.eventListeners.get(name)?.filter(g=>g !== f);
    }
    constructor(){}

    emitEvent(name : string){
        this.eventListeners.get(name)?.forEach(f=>f());
    }
}

