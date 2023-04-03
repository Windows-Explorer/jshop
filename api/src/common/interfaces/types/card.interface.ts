import { ICardColor } from "./color.interface"
import { ICardType } from "./card-type.type"

export interface ICard {
    id?: number
    name: string
    text: string
    manacost: number
    pt: number
    maintype: ICardType
    type: ICardType
    color: ICardColor
    image: string
}