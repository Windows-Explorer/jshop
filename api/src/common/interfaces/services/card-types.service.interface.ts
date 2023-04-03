import { ICardType } from "../types/card-type.type"

export interface ICardTypesService {
    findAll(): Promise<ICardType[]>
}