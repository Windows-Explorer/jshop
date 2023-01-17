import { IsNotEmpty } from "class-validator"
import { Card } from "src/card/entities/card.entity"
import { Color } from "src/card/entities/color.entity"

export class CardCreateDto implements Card {
    @IsNotEmpty()
    id?: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    manacost: number
    
    @IsNotEmpty()
    pt: number

    @IsNotEmpty()
    color: Color
    

}