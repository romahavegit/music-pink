import { ICanCheck } from "./ICanCheck";

export const iCanCheckBool : ICanCheck<boolean> = (arg) : arg is boolean=>typeof arg === "boolean";
