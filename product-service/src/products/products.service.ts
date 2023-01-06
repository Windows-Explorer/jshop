import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { IProductsService } from "src/common/interfaces/products.service.interface"
import { Repository } from "typeorm"
import { Product } from "./entities/product.entity"

@Injectable()
export class ProductsService implements IProductsService {
    constructor( @InjectRepository(Product) private readonly _productsRepository: Repository<Product> ) {}

    async findById(productId: number): Promise<Product> {
        return await this._productsRepository.findOne({ where: { id: productId } })
    }

    async findAll(): Promise<Product[]> {
        return await this._productsRepository.find()
    }

    async save(product: Product): Promise<Product> {
        return await this._productsRepository.save(product)
    }

    async saveMany(product: Product[]): Promise<Product[]> {
        return await this._productsRepository.save(product)
    }

    async removeOne(id: number): Promise<Product[]> {
        await this._productsRepository.delete(id)
        return await this.findAll()
    }
}
