import { FindManyOptions } from "typeorm"
import { IProductsFilterPayload } from "./products-filter.interface"

export interface IFilter {
    filter(filter: IProductsFilterPayload): Promise<FindManyOptions>
}