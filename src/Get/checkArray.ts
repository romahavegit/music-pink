import { isArray } from "lodash"

export const checkArray = <T>(checkOne : (arg : unknown)=>arg is T, arg : unknown) : arg is T[]=>{
    if(isArray(arg)){
        return arg.every(checkOne);
    } else{
        return false;
    }
}