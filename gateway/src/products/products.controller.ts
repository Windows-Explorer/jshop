import { Body, Controller, Get, Inject, Param, Post, Res, UseGuards } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Response } from 'express'
import { IResult } from 'src/dto/result.dto'
import { AdminGuard } from 'src/guards/admin.guard'

@Controller('products')
export class ProductsController {
    constructor(@Inject("PRODUCTS_GATEWAY") private readonly client: ClientKafka) {}

    @Get("/")
    async findAll(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("get.products.findAll", "").toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Get("/:id")
    async findById(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("get.products.findById", id).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }
    
    @UseGuards(AdminGuard)
    @Post("/save")
    async save(@Body() product: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("post.products.save", product).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @UseGuards(AdminGuard)
    @Post("/savemany")
    async saveMany(@Body() product: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("post.products.saveMany", product).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @UseGuards(AdminGuard)
    @Get("/remove/:id")
    async removeOne(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("post.products.removeOne", id).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }
}
