import { ICardType } from "./type.interface"

export interface ITypesService {
    findAll(): Promise<ICardType[]>
}