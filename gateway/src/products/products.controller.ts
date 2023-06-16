import { Controller, Get, Inject, Param, Query, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"

@Controller("products")
export class ProductsController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @Get("/")
    async findAll(@Res() response: Response, @Query("categoryName") categoryName: string) {
        const result = await this._client.send("products.findAll", categoryName).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/:id")
    async findById(@Res() response: Response, @Query("categoryName") categoryName: string, @Param("id") id: number) {
        const payload = {
            categoryName: categoryName,
            id: id
        }
        const result = await this._client.send("products.findById", payload).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
