import { ICardColor } from "../types/color.interface"

export interface ICardColorsService {
    findAll(): Promise<ICardColor[]>
}