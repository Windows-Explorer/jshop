import { IsNotEmpty } from "class-validator"
import { ICardType } from "../interfaces/types/card-type.type"
import { ICard } from "../interfaces/types/card.interface"
import { ICardColor } from "../interfaces/types/color.interface"

export class CardCreateDto implements ICard {
    @IsNotEmpty()
    id?: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    manacost: number

    @IsNotEmpty()
    pt: number

    @IsNotEmpty()
    maintype: ICardType

    @IsNotEmpty()
    type: ICardType

    @IsNotEmpty()
    color: ICardColor

    @IsNotEmpty()
    image: string
}