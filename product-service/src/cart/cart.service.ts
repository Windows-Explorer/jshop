import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { ICartProduct } from "src/common/interfaces/data/cart-product.interface"
import { ICartService } from "src/common/interfaces/services/cart.service.interface"
import { InjectRedis } from "@liaoliaots/nestjs-redis"
import Redis from "ioredis"
import { IProduct } from "src/common/interfaces/data/product.interface"

@Injectable()
export class CartService implements ICartService {
    constructor(
        @InjectRedis() private readonly _redisClient: Redis
    ) { }

    async getCart(userEmail: string): Promise<ICartProduct[]> {
        try {
            const result = await this._redisClient.get(userEmail)
            return await JSON.parse(result)
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async addProductToCart(userEmail: string, product: IProduct): Promise<ICartProduct[]> {
        try {
            const cart: ICartProduct[] = await JSON.parse(await this._redisClient.get(userEmail))
            const index = cart.map(value => value.product).findIndex(el => el === product)
            if (index != -1) {
                cart[index].count++
            }
            else {
                cart.push({ product: product, count: 1 })
            }
            await this._redisClient.set(userEmail, cart.toString())
            return cart
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async removeProductFromCart(userEmail: string, product: IProduct): Promise<ICartProduct[]> {
        try {
            const cart: ICartProduct[] = await JSON.parse(await this._redisClient.get(userEmail))
            const index = cart.map(value => value.product).findIndex(el => el === product)
            if (index != -1) {
                cart.splice(index, 1)
            }
            await this._redisClient.set(userEmail, cart.toString())
            return cart
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async clearCart(userEmail: string): Promise<ICartProduct[]> {
        try {
            this._redisClient.set(userEmail, "[]")
            return await JSON.parse(await this._redisClient.get(userEmail))
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
