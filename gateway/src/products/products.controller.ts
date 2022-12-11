import { Controller, Get, Inject, Param, Res, UseGuards } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Response } from 'express'
import { IResult } from 'src/dto/result.dto'
import { AdminGuard } from 'src/guards/admin.guard'

@Controller('products')
export class ProductsController {
    constructor(@Inject("PRODUCTS_GATEWAY") private readonly client: ClientKafka) {}

    @UseGuards(AdminGuard)
    @Get("/")
    async gamesFindAll(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("get.products.findAll", "").toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Get("/:id")
    async gamesFindById(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("get.products.findById", id).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }
}
