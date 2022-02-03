export interface IHaveEvents<Events>{
    addEventListener(ev : Events, f : ()=>void) : void;
}