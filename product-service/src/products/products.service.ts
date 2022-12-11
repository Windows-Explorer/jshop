import { Injectable } from '@nestjs/common'
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
    constructor( @InjectRepository(Product) private readonly productsRepository: Repository<Product> ) {}

    async findById(productId: number): Promise<Product> {
        return await this.productsRepository.findOne({ where: { id: productId } })
    }

    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find()
    }
}
