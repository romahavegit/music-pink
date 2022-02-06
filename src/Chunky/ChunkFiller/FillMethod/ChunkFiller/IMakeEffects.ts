export interface IMakeEffects<T>{
    addReceiveEventListener(f : (chunks : T[])=>void) : void
    removeReceiveListener(f : (chunks : T[])=>void) : void
}