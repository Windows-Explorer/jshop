import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { CART_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { FindDto } from "src/common/dto/find.dto"
import { IProduct } from "src/common/interfaces/data/product.interface"
import { IResult } from "src/common/interfaces/data/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"
import { ICartService } from "src/common/interfaces/services/cart.service.interface"

@Controller("cart")
export class CartController {
    constructor(
        @Inject(CART_SERVICE_TOKEN) private readonly _cartService: ICartService,
        @Inject(RESULTER_TOKEN) private readonly _output: IOutput
    ){}


    @MessagePattern("products.findAll")
    async findAll(@Payload() payload: FindDto): Promise<IResult<IProduct[]>> {
        const result: IResult<IProduct[]> = await this._output.responseAsync(HttpStatus.OK, await this._cartService.findAll())
        return result
    }
}