import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { ICartProduct } from "src/common/interfaces/data/cart-product.interface"
import { ICartService } from "src/common/interfaces/services/cart.service.interface"
import { InjectRedis } from "@liaoliaots/nestjs-redis"
import Redis from "ioredis"

@Injectable()
export class CartService implements ICartService {
    constructor(
        @InjectRedis() private readonly _redisClient: Redis
    ) { }

    async findAll(userEmail: string): Promise<ICartProduct[]> {
        try {
            const result = await this._redisClient.get(userEmail)
            console.log(JSON.parse(result))
            return JSON.parse(result)
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async save(cart: ICartProduct[]): Promise<ICartProduct[]> {
        try {
            await this._redisClient.set(cart[0].userEmail, JSON.stringify(cart))
            return await JSON.parse(await this._redisClient.get(cart[0].userEmail))
//             if (cartProduct.count > 0 && cartProduct.product) {
//                 const cartProducts: ICartProduct[] = await JSON.parse(await this._redisClient.get(cartProduct.userEmail))
//                 cartProducts.push(cartProduct)
//                 await this._redisClient.set(cartProduct.userEmail, JSON.stringify(cartProducts))
//                 return cartProduct
//             }
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async count(userEmail: string): Promise<{ count: number }> {
        throw new Error("Method not implemented.")
    }

    async remove(cartProduct: ICartProduct): Promise<string> {
        try {
            if (cartProduct.userEmail) {
                const cartProducts: ICartProduct[] = await JSON.parse(await this._redisClient.get(cartProduct.userEmail))
                const cartProductIndex = cartProducts.findIndex(async (value: ICartProduct) => value == cartProduct)
                cartProducts.splice(cartProductIndex, 1)
                return "removed"
            }
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
