import { IsNotEmpty } from "class-validator"
import { Card } from "src/card/entities/card.entity"
import { Color } from "src/card/entities/color.entity"
import { CardType } from "src/card/entities/type.entity"
import { ICard } from "../interfaces/card.interface"

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
    maintype: CardType

    @IsNotEmpty()
    type: CardType

    @IsNotEmpty()
    color: Color
    

}