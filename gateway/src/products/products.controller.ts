import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { IResult } from 'src/dto/result.dto';

@Controller('products')
export class ProductsController {
    constructor(@Inject("PRODUCTS_GATEWAY") private readonly client: ClientKafka) {}

    @Get("/books")
    async booksFindAll(@Res() response: Response): Promise<any> {
        const result: IResult<any> = await this.client.send("get.books.findAll", "").toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Get("/games")
    async gamesFindAll(@Res() response: Response): Promise<any> {
        const result: IResult<any> = await this.client.send("get.games.findAll", "").toPromise()
        response.status(result.error.statusCode).send(result.data)
    }
}
