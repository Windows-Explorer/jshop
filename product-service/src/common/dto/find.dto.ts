import { IProductsFilterPayload } from "../interfaces/products-filter.interface"

export interface FindDto {
    page?: number,
    filter: IProductsFilterPayload
}