import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CartProduct } from "./entities/cart-product.entity"
import { CART_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CartService } from "./cart.service"
import { CartController } from "./cart.conrtoller"
import { Resulter } from "src/common/resulter"

@Module({
    imports: [
        TypeOrmModule.forFeature([CartProduct])
    ],
    providers: [
        { provide: CART_SERVICE_TOKEN, useClass: CartService },
        { provide: RESULTER_TOKEN, useClass: Resulter },
    ],
    controllers: [
        CartController
    ]
})
export class CartModule {

}