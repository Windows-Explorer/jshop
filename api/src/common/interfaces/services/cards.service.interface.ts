import { IFilter } from "../filter.interface"
import { ICard } from "../types/card.interface"

export interface ICardsService {
    findAll(filter: IFilter): Promise<ICard[]> 
    save(card: ICard): Promise<ICard>
    parseData(): Promise<ICard[]>
}