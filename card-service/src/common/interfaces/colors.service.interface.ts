import { IColor } from "./color.interface"

export interface IColorsService {
    findAll(): Promise<IColor[]>
}