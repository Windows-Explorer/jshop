import { Card } from "src/card/entities/card.entity"
import { CardCreateDto } from "../dto/card-create.dto"

export interface ICardService {
    findAll(): Promise<Card[]> 
    save(card: CardCreateDto): Promise<Card>
}