import { ICardType } from "./card-type-object.interface"
import { IColor } from "./color-object.interface"

export interface ICard {
    id?: number
    name: string
    text: string
    manacost: number
    pt: number
    maintype: ICardType
    type: ICardType
    color: IColor
    image: string
}