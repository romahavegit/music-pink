import { ISource } from "ISource";

export interface IDB<Item> extends ISource<Item>{
    setItem(id : string, item : Item) : Promise<void>;
}