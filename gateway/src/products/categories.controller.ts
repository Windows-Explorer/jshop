import { Controller, Get, Inject, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"

@Controller("categories")
export class CategoriesController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @Get("/")
    async findAll(@Res() response: Response) {
        console.log("dolboebizm has been called")
        const result = await this._client.send("categories.findAll", "").toPromise()
        console.log(result)
        response.status(result.statusCode).send(result.message)
    }
}
