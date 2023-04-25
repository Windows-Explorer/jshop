import { Controller, Get, Inject, Param, Query, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { CART_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IResult } from "src/common/dto/result.dto"

@Controller("cart")
export class CartController {
    constructor(@Inject(CART_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @Get("/")
    async findAll(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("cart.findAll", "").toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/count")
    async count(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("cart.count", "").toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/:id")
    async remove(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("cart.remove", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
