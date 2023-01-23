import { IColor } from "./color.interface";

export interface IFilter {
    name: string,
    manacost: number,
    pt: number,
    color: string,
    type: string
}