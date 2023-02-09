import { Inject, Injectable } from "@nestjs/common"
import { HttpException } from "@nestjs/common/exceptions"
import { InjectRepository } from "@nestjs/typeorm"
import { FILTER_TOKEN, LOGGER_TOKEN, PAGINATOR_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IFilter } from "src/common/interfaces/filter.interface"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { IPaginator } from "src/common/interfaces/paginator.interface"
import { IProduct } from "src/common/interfaces/product.interface"
import { IProductsFilterPayload } from "src/common/interfaces/products-filter.interface"
import { IProductsService } from "src/common/interfaces/products.service.interface"
import { IResultAndCount } from "src/common/interfaces/result-and-count.interface"
import { FindManyOptions, Repository } from "typeorm"
import { Product } from "./entities/product.entity"

@Injectable()
export class ProductsService implements IProductsService {
    constructor(
        @InjectRepository(Product) private readonly _productsRepository: Repository<IProduct>,
        @Inject(FILTER_TOKEN) private readonly _filter: IFilter,
        @Inject(PAGINATOR_TOKEN) private readonly _paginator: IPaginator,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ){}

    async findById(productId: number): Promise<IProduct> {
        return await this._productsRepository.findOne({ where: { id: productId } })
    }

    async findAll(page: number, filter: IProductsFilterPayload): Promise<IResultAndCount<IProduct[]>> {
        try {
            const filteredOptions: FindManyOptions = await this._filter.filter(filter)
            const paginatedOptions: FindManyOptions = await this._paginator.paginateFromPageNumber(page, filteredOptions)
            const [result, count] = await this._productsRepository.findAndCount(paginatedOptions)
            return { result: result, count: count / 10 }
        }
        catch(error) {
            this._logger.log(error, "PRODUCTS-SERVICE: findAll")
            throw new HttpException(error, 500)
        }
    }

    async save(product: Product): Promise<Product> {
        return await this._productsRepository.save(product)
    }

    async saveMany(product: Product[]): Promise<Product[]> {
        return await this._productsRepository.save(product)
    }

    async removeOne(id: number): Promise<void> {
        await this._productsRepository.delete(id)
    }
}
