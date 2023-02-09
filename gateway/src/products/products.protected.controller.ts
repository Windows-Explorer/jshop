import { Body, Controller, Get, Inject, Param, Post, Res, UseGuards } from "@nestjs/common"
import { Delete } from "@nestjs/common/decorators"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IResult } from "src/common/dto/result.dto"
import { AdminGuard } from "src/guards/admin.guard"

@Controller("products")
export class ProductsProtectedController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) {}
    
    @UseGuards(AdminGuard)
    @Post("/")
    async save(@Body() product: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.save", product).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @UseGuards(AdminGuard)
    @Delete("/:id")
    async removeOne(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.removeOne", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}