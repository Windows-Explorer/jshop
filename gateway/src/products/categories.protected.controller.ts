import { Body, Controller, Inject, Param, Post, Res, UseGuards } from "@nestjs/common"
import { Delete } from "@nestjs/common/decorators"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { AdminGuard } from "src/guards/admin.guard"

@Controller("categories")
export class CategoriesProtectedController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @UseGuards(AdminGuard)
    @Post("/")
    async save(@Body() product: any, @Res() response: Response) {
        const result = await this._client.send("products.categories.save", product).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @UseGuards(AdminGuard)
    @Delete("/:id")
    async removeOne(@Param("id") id: number, @Res() response: Response) {
        const result = await this._client.send("products.categories.remove", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}