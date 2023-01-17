import { IColor } from "./color.interface"
import { ICardType } from "./type.interface"

export interface ICard {
    id?: number
    name: string
    text: string
    manacost: number
    pt: number
    maintype: ICardType
    type: ICardType
    color: IColor
}