import { CardCreateDto } from "../dto/card-create.dto"
import { ICard } from "./card.interface"

export interface ICardsService {
    findAll(): Promise<ICard[]> 
    save(card: CardCreateDto): Promise<ICard>
    parseData(): Promise<ICard[]>
}