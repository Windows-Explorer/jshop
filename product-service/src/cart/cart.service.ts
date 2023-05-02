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

    async findAll(userId: number): Promise<ICartProduct[]> {
        try {
            if (userId >= 0) {
                const result = await this._redisClient.get(userId.toString())
                return JSON.parse(result)
            }
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async save(cartProduct: ICartProduct): Promise<ICartProduct> {
        try {
            if (cartProduct.count > 0 && cartProduct.product) {
                const cartProducts: ICartProduct[] = await JSON.parse(await this._redisClient.get(cartProduct.userId.toString()))
                cartProducts.push(cartProduct)
                await this._redisClient.set(cartProduct.userId.toString(), JSON.stringify(cartProducts))
                return cartProduct
            }
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async count(userId: any): Promise<{ count: number }> {
        throw new Error("Method not implemented.")
    }

    async remove(cartProduct: ICartProduct): Promise<string> {
        try {
            if (cartProduct.userId >= 0) {
                const cartProducts: ICartProduct[] = await JSON.parse(await this._redisClient.get(cartProduct.userId.toString()))
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