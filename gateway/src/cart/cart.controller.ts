import { Body, Controller, Get, Inject, Param, Query, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { CART_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IResult } from "src/common/dto/result.dto"

@Controller("cart")
export class CartController {
    constructor(@Inject(CART_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @Get("/")
    async findAll(@Query("userId") userId: number, @Res() response: Response) {
        const result = await this._client.send("cart.findAll", userId).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/save")
    async save(@Body() body: any, @Res() response: Response) {
        const result = await this._client.send("cart.save", body.cartProduct).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/:id")
    async remove(@Param("id") id: number, @Res() response: Response) {
        const result = await this._client.send("cart.remove", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
