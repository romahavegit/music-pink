export interface ICanDone{
    addDoneListener(f : ()=>void) : void;
    removeDoneListener(f : ()=>void) : void;
}