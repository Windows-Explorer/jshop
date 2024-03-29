import { Controller, Get, Inject, Param, Query, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"

@Controller("products")
export class ProductsController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @Get("/")
    async findAll(@Res() response: Response) {
        const result = await this._client.send("products.findAll", "").toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/:id")
    async findById(@Param("id") id: number, @Res() response: Response) {
        const result = await this._client.send("products.findById", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
