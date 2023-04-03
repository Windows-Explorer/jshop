import { IFilter } from "../filter.interface"
import { ICard } from "../types/card.interface"

export interface ICardsService {
    findAll(page: number, filter: IFilter): Promise<ICard[]> 
    save(card: ICard): Promise<ICard>
    parseData(): Promise<ICard[]>
}