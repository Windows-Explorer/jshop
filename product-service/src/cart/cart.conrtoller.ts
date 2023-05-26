import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { CART_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { ICartProduct } from "src/common/interfaces/data/cart-product.interface"
import { IResult } from "src/common/interfaces/data/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"
import { ICartService } from "src/common/interfaces/services/cart.service.interface"

@Controller("cart")
export class CartController {
    constructor(
        @Inject(CART_SERVICE_TOKEN) private readonly _cartService: ICartService,
        @Inject(RESULTER_TOKEN) private readonly _output: IOutput
    ) { }


    @MessagePattern("cart.findAll")
    async findAll(@Payload() payload: string): Promise<IResult<ICartProduct[]>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._cartService.findAll(payload))
        return result
    }

    @MessagePattern("cart.save")
    async save(@Payload() payload: ICartProduct): Promise<IResult<ICartProduct>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._cartService.save(payload))
        return result
    }

    @MessagePattern("cart.remove")
    async remove(@Payload() payload: ICartProduct): Promise<IResult<string>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._cartService.remove(payload))
        return result
    }
}