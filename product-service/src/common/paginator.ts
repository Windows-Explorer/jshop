import { Inject, Injectable } from "@nestjs/common"
import { HttpException } from "@nestjs/common/exceptions"
import { FindManyOptions } from "typeorm"
import { LOGGER_TOKEN } from "./constants/inject-tokens.constant"
import { PRODUCTS_COUNT_AT_PAGE } from "./constants/products-count-at-page.constant"
import { ILoggerOutput } from "./interfaces/logger-output.interface"
import { IPaginator } from "./interfaces/paginator.interface"
import { IProduct } from "./interfaces/product.interface"

@Injectable()
export class Paginator implements IPaginator {
    constructor(@Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput){}

    async paginateFromPageNumber(page: number, inputOptions: FindManyOptions<any>): Promise<FindManyOptions<IProduct>> {
        try {
            inputOptions.take = PRODUCTS_COUNT_AT_PAGE
            inputOptions.skip = ((page * inputOptions.take) < 0 ? 0: (page * inputOptions.take)) || 0
            return inputOptions
        }
        catch(error) {
            throw new HttpException(error, 500)
        }
    }
    
}