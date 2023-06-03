import { Body, Controller, Get, Post, Delete, Inject, Param, Query, Req, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Request, Response, response } from "express"
import { CART_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"

async function getEmailFromToken(request: Request): Promise<string> {
    const token = request.headers.authorization.replace("Bearer ", "")
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const JSONdataFromToken = await JSON.parse(jsonPayload)
    const userEmail: string = JSONdataFromToken
    console.log(userEmail)
    return userEmail
}

@Controller("cart")
export class CartController {
    constructor(@Inject(CART_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @Get("/")
    async getCart(@Res() response: Response, @Req() request: Request) {
        const userEmail = await getEmailFromToken(request)
        const result = await this._client.send("cart.getCart", userEmail).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Post("/addproducttocart")
    async addProductToCart(@Res() response: Response, @Req() request: Request, @Body() product: any) {
        const userEmail = getEmailFromToken(request)
        const result = await this._client.send("cart.addProductToCart", { userEmail: userEmail, product: product }).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Post("/removeproductfromcart")
    async removeProductFromCart(@Res() response: Response, @Req() request: Request, @Body() product: any) {
        const userEmail = getEmailFromToken(request)
        const result = await this._client.send("cart.removeProductFromCart", { userEmail: userEmail, product: product }).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/clearCart")
    async clearCart(@Res() response: Response, @Req() request: Request) {
        const userEmail = getEmailFromToken(request)
        const result = await this._client.send("cart.clearCart", userEmail)
    }
}
