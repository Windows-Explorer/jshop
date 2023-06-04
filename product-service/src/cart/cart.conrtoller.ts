import { Controller, HttpStatus, Inject, UseFilters } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { CART_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { ICartProduct } from "src/common/interfaces/data/cart-product.interface"
import { IProduct } from "src/common/interfaces/data/product.interface"
import { IResult } from "src/common/interfaces/data/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"
import { ICartService } from "src/common/interfaces/services/cart.service.interface"
import { NoExceptionFilter } from "src/extentions/no-exception-filter"

@Controller("cart")
export class CartController {
    constructor(
        @Inject(CART_SERVICE_TOKEN) private readonly _cartService: ICartService,
        @Inject(RESULTER_TOKEN) private readonly _output: IOutput
    ) { }


    @UseFilters(new NoExceptionFilter())
    @MessagePattern("cart.getCart")
    async getCart(@Payload() userEmail: string): Promise<IResult<ICartProduct[]>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._cartService.getCart(userEmail))
        return result
    }

    @UseFilters(new NoExceptionFilter())
    @MessagePattern("cart.addProductToCart")
    async addProductToCart(@Payload() payload: { userEmail: string, product: IProduct }): Promise<IResult<ICartProduct[]>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._cartService.addProductToCart(payload.userEmail, payload.product))
        return result
    }

    @UseFilters(new NoExceptionFilter())
    @MessagePattern("cart.removeProductFromCart")
    async remove(@Payload() payload: { userEmail: string, product: IProduct }): Promise<IResult<ICartProduct[]>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._cartService.removeProductFromCart(payload.userEmail, payload.product))
        return result
    }

    @UseFilters(new NoExceptionFilter())
    @MessagePattern("cart.clearCart")
    async clearCart(@Payload() userEmail: string): Promise<IResult<ICartProduct[]>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._cartService.clearCart(userEmail))
        return result
    }
}
