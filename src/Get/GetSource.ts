import { checkArray } from "./checkArray";
import { fetchAndCheck } from "./fetchAndCheck";
import { Get } from "./Get";
import { serrializeBodyAndCheck } from "./serrializeBodyAndCheck";

const chain1 = <T>(check : (arg : unknown)=> arg is T)=>(res : string )=>fetchAndCheck((arg : Response)=>serrializeBodyAndCheck(check, arg), res)
const chain2 = <T>(check : (arg : unknown)=>arg is T)=>(res : string )=>chain1((arg) : arg is [T]=>checkArray<T>(check, arg))(res);



export const getSource = <T>(unknownIsItem : (arg : unknown)=>arg is T, endpointPath : string, itemName : string)=>new Get(chain1(unknownIsItem), chain2(unknownIsItem), endpointPath, itemName, "http", 3000, "localhost");