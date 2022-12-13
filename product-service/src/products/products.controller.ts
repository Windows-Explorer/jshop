import { Controller, HttpStatus, Param } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { IResult } from 'src/dto/result.dto'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    constructor( private readonly productsService: ProductsService ) {}

    @MessagePattern("get.products.findAll")
    async findAll(): Promise<IResult<Product[]>> {
        const result: IResult<Product[]> = { data: await this.productsService.findAll(), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("get.products.findById")
    async findById(@Payload() id: number): Promise<IResult<Product>> {
        const result: IResult<Product> = { data: await this.productsService.findById(id), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("post.products.save")
    async save(@Payload() product: Product): Promise<IResult<Product>> {
        const result: IResult<Product> = { data: await this.productsService.save(product), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("post.products.saveMany")
    async saveMany(@Payload() product: Product[]): Promise<IResult<Product[]>> {
        const result: IResult<Product[]> = { data: await this.productsService.saveMany(product), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }
}
