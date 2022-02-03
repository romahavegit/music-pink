export interface ISource<Item>{
    getItem(id : string) : Promise<Item>
    getItems(count : number) : Promise<Item[]>;
}