import { CardCreateDto } from "../dto/card-create.dto"
import { IFilter } from "./filter.interface"
import { ICard } from "./card.interface"
import { IResultAndCount } from "./result-and-count.interface"

export interface ICardsService {
    findAll(page: number, filter: IFilter): Promise<ICard[] | IResultAndCount<ICard[]>> 
    save(card: CardCreateDto): Promise<ICard>
    parseData(): Promise<ICard[]>
}