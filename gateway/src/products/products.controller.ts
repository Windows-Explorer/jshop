import { Controller, Get, Inject, Param, Res } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Response } from 'express'
import { IResult } from 'src/dto/result.dto'

@Controller('products')
export class ProductsController {
    constructor(@Inject("PRODUCTS_GATEWAY") private readonly client: ClientKafka) {}

    @Get("/books")
    async booksFindAll(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("get.books.findAll", "").toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Get("/games")
    async gamesFindAll(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("get.games.findAll", "").toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Get("/books/:id")
    async booksFindById(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("get.books.findById", id).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Get("/games/:id")
    async gamesFindById(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("get.games.findById", id).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }
}
