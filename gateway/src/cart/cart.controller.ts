import { Body, Controller, Get, Post, Delete, Inject, Param, Query, Req, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Request, Response } from "express"
import { CART_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"

@Controller("cart")
export class CartController {
    constructor(@Inject(CART_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @Get("/")
    async findAll(@Res() response: Response, @Req() request: Request) {
        const token = request.headers.authorization.replace("Bearer ", "")

        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))

        const JSONdataFromToken = await JSON.parse(jsonPayload)

        const userEmail: string = JSONdataFromToken

        const result = await this._client.send("cart.findAll", userEmail).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Post("/save")
    async save(@Body() body: any, @Res() response: Response) {
        const result = await this._client.send("cart.save", body.cartProduct).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Delete("/:id")
    async remove(@Param("removableCartProduct") removableCartProduct: any, @Res() response: Response) {
        const result = await this._client.send("cart.remove", removableCartProduct).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
