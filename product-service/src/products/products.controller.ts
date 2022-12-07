import { Controller, HttpStatus, Param } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { IResult } from 'src/dto/result.dto'
import { Book } from './entities/book.entity'
import { Game } from './entities/game.entity'
import { BooksService } from './services/books.service'
import { GamesService } from './services/games.service'

@Controller('products')
export class ProductsController {
    constructor(
        private readonly booksService: BooksService,
        private readonly gamesService: GamesService
    ){}

    @MessagePattern("get.books.findAll")
    async booksFindAll(): Promise<IResult<Book[]>> {
        const result: IResult<Book[]> = { data: await this.booksService.findAll(), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("get.games.findAll")
    async gamesFindAll(): Promise<IResult<Game[]>> {
        const result: IResult<Game[]> = { data: await this.gamesService.findAll(), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("get.books.findById")
    async booksFindById(@Payload() id: number): Promise<IResult<Book>> {
        const result: IResult<Book> = { data: await this.booksService.findById(id), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("get.games.findById")
    async gamesFindById(@Payload() id: number): Promise<IResult<Game>> {
        const result: IResult<Game> = { data: await this.gamesService.findById(id), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }
}
