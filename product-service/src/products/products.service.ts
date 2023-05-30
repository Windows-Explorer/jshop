import { Inject, Injectable } from "@nestjs/common"
import { HttpException } from "@nestjs/common/exceptions"
import { InjectRepository } from "@nestjs/typeorm"
import { FILTER_TOKEN, LOGGER_TOKEN, PAGINATOR_TOKEN } from "src/common/constants/inject-tokens.constant"
import { PRODUCTS_COUNT_AT_PAGE } from "src/common/constants/products-count-at-page.constant"
import { IFilter } from "src/common/interfaces/filter.interface"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { IPaginator } from "src/common/interfaces/paginator.interface"
import { IProduct } from "src/common/interfaces/data/product.interface"
import { IProductsFilterPayload } from "src/common/interfaces/products-filter.interface"
import { IProductsService } from "src/common/interfaces/services/products.service.interface"
import { DeleteResult, FindManyOptions, Repository } from "typeorm"
import { Product } from "./entities/product.entity"

@Injectable()
export class ProductsService implements IProductsService {
    constructor(
        @InjectRepository(Product) private readonly _productsRepository: Repository<IProduct>,
        @Inject(FILTER_TOKEN) private readonly _filter: IFilter,
        @Inject(PAGINATOR_TOKEN) private readonly _paginator: IPaginator,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ) { }

    async count(page: number, filter: IProductsFilterPayload): Promise<{ count: number }> {
        try {
            const filteredOptions: FindManyOptions = await this._filter.filter(filter)
            const paginatedOptions: FindManyOptions = await this._paginator.paginateFromPageNumber(page, filteredOptions)
            const count: number = await this._productsRepository.count(paginatedOptions)
            return { count: count / PRODUCTS_COUNT_AT_PAGE }
        }
        catch (error) {
            this._logger.log(error, "PRODUCTS-SERVICE: count")
            throw new HttpException(error, 500)
        }
    }

    async findById(productId: number): Promise<IProduct> {
        return await this._productsRepository.findOne({ where: { id: productId } })
    }

    async findAll(): Promise<IProduct[]> {
        try {
            // const filteredOptions: FindManyOptions = await this._filter.filter(filter)
            // const paginatedOptions: FindManyOptions = await this._paginator.paginateFromPageNumber(page, filteredOptions)
            const result = await this._productsRepository.find()
            return result
        }
        catch (error) {
            this._logger.log(error, "PRODUCTS-SERVICE: findAll")
            throw new HttpException(error, 500)
        }
    }

    async save(product: Product): Promise<Product> {
        return await this._productsRepository.save(product)
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this._productsRepository.delete(id)
    }
}
