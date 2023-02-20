import { Inject, Injectable } from "@nestjs/common"
import { HttpException } from "@nestjs/common/exceptions"
import { Equal, FindManyOptions, Like, Not } from "typeorm"
import { LOGGER_TOKEN } from "./constants/inject-tokens.constant"
import { IFilter } from "./interfaces/filter.interface"
import { ILoggerOutput } from "./interfaces/logger-output.interface"
import { IProduct } from "./interfaces/product.interface"
import { IProductsFilterPayload } from "./interfaces/products-filter.interface"

@Injectable()
export class Filter implements IFilter {
    constructor(
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ){}

    async filter(filter: IProductsFilterPayload): Promise<FindManyOptions<IProduct>> {
        try {
            if(!filter) return {}
            const result: FindManyOptions = {
                where: {
                    title: filter.title ? Like(`%${filter.title}%`) : Like("%%"),
                    cost: filter.cost ? Equal(filter.cost) : Not(999999),
                    category: { name: filter.category },
                    subcategory: { name: filter.subcategory }
                }
            }
            return result
        }
        catch(error) {
            this._logger.log(error, "FILTER")
            throw new HttpException(error, 500)
        }
    }
    
}