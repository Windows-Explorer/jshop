import { Controller, Get, Inject, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"

@Controller("products")
export class CategoriesController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @Get("/dolboebizm")
    async findAll(@Res() response: Response) {
        const result = await this._client.send("products.categories.findAll", "").toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
