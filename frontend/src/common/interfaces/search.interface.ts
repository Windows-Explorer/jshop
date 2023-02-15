import { RouteParamsRaw } from "vue-router"
import { IProductsFilter } from "./products-filter.interface"

export interface ISearch {
    find(filter: IProductsFilter): Promise<void>
    sortFilterParams(filter: IProductsFilter): Promise<RouteParamsRaw>
}