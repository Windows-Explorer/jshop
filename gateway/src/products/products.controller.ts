import { Body, Controller, Get, Inject, Param, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { IResult } from "src/dto/result.dto"

@Controller("products")
export class ProductsController {
    constructor(@Inject("PRODUCTS_GATEWAY") private readonly _client: ClientKafka) {}

    @Get("/")
    async findAll(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.findAll", "").toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/:id")
    async findById(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.findById", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
