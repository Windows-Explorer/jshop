import { RouteParamsRaw, Router } from "vue-router";
import { IProductsFilter } from "./interfaces/products-filter.interface";
import { ISearch } from "./interfaces/search.interface"

export class Search implements ISearch {
    constructor(
        private readonly _router: Router
    ) {}

    async sortFilterParams(filter: IProductsFilter | any): Promise<RouteParamsRaw> {
        let routeParams: RouteParamsRaw = {}
        Object.keys(filter).forEach(key => {
            if(filter[key]) routeParams[key] = filter[key]
        })
        return routeParams
    }

    async find(filter: IProductsFilter): Promise<void> {
        await this._router.replace({ name: "home", query: await this.sortFilterParams(filter)})
        window.location.reload()
    }

    
    
}