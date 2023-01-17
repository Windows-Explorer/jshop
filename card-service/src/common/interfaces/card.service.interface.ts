import { Card } from "src/card/entities/card.entity"
import { CardCreateDto } from "../dto/card-create.dto"
import { ICard } from "./card.interface"

export interface ICardService {
    findAll(): Promise<ICard[]> 
    save(card: CardCreateDto): Promise<ICard>
    parseData(): Promise<ICard[]>
    pushParsedData(): Promise<ICard[]>
}