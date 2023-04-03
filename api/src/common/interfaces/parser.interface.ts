import { ICardType } from "./types/card-type.type"
import { ICard } from "./types/card.interface"
import { ICardColor } from "./types/color.interface"

export interface IParser {
    parseColors(xml: string): Promise<ICardColor[]>
    parseTypes(xml: string): Promise<ICardType[]>
    parseCards(xml: string): Promise<ICard[]>
}