import { ICard } from "./card.interface"
import { IColor } from "./color.interface"
import { ICardType } from "./type.interface"

export interface IParser {
    parseColors(xml: string): Promise<IColor[]>
    parseTypes(xml: string): Promise<ICardType[]>
    parseCards(xml: string): Promise<ICard[]>
}