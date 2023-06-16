import { Inject, Injectable } from "@nestjs/common"
import { HttpException } from "@nestjs/common/exceptions"
import { InjectRepository } from "@nestjs/typeorm"
import { LOGGER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { IProduct } from "src/common/interfaces/data/product.interface"
import { IProductsService } from "src/common/interfaces/services/products.service.interface"
import { DeleteResult, Equal, Repository } from "typeorm"
import { Product } from "./entities/product.entity"
import { Category } from "./entities/category.entity"
import { ICategory } from "src/common/interfaces/data/category.interface"

@Injectable()
export class ProductsService implements IProductsService {
    constructor(
        @InjectRepository(Product) private readonly _productsRepository: Repository<IProduct>,
        @InjectRepository(Category) private readonly _categoryRepository: Repository<ICategory>,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ) { }

    async findById(productId: number, categoryName?: string): Promise<IProduct> {
        let result: IProduct
        if (categoryName && categoryName.length > 0) {
            const currentCategory = await this._categoryRepository.findOne({ where: { name: Equal(categoryName) } })
            result = await this._productsRepository.findOne({ where: { category: currentCategory } })
        }
        else {
            result = await this._productsRepository.findOne({ where: { id: productId } })
        }
        return result
    }

    async findAll(categoryName?: string): Promise<IProduct[]> {
        try {
            let result: IProduct[] = []
            if (categoryName && categoryName.length > 0) {
                console.log(categoryName)
                const currentCategory = await this._categoryRepository.findOne({ where: { name: Equal(categoryName) } })
                result = await this._productsRepository.find({ where: { category: currentCategory } })
            }
            else {
                result = await this._productsRepository.find()
            }
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
