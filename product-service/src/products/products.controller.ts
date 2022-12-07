import { Controller, HttpStatus, Param } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { IResult } from 'src/dto/result.dto'
import { BooksService } from './books.service'
import { GamesService } from './games.service'
import { Product } from './entities/product.entity'

@Controller('products')
export class ProductsController {
    constructor(
        private readonly booksService: BooksService,
        private readonly gamesService: GamesService
    ) {}

    @MessagePattern("get.books.findAll")
    async booksFindAll(): Promise<IResult<Product[]>> {
        const result: IResult<Product[]> = { data: await this.booksService.findAll(), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("get.games.findAll")
    async gamesFindAll(): Promise<IResult<Product[]>> {
        const result: IResult<Product[]> = { data: await this.gamesService.findAll(), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("get.books.findById")
    async booksFindById(@Payload() id: number): Promise<IResult<Product>> {
        const result: IResult<Product> = { data: await this.booksService.findById(id), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("get.games.findById")
    async gamesFindById(@Payload() id: number): Promise<IResult<Product>> {
        const result: IResult<Product> = { data: await this.gamesService.findById(id), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }
}
