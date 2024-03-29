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
            let cart = await JSON.parse(await this._redisClient.get(userEmail))
            return cart
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async addProductToCart(userEmail: string, product: IProduct): Promise<ICartProduct[]> {
        try {
            let cart: ICartProduct[] = await JSON.parse(await this._redisClient.get(userEmail))
            if (cart === null) cart = []
            const index = cart.findIndex(el => el.product.id === product.id)
            if (index >= 0) {
                cart[index].count++
            }
            else {
                cart.push({ product: product, count: 1 })
            }
            await this._redisClient.set(userEmail, JSON.stringify(cart))
            return cart
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async removeProductFromCart(userEmail: string, product: IProduct): Promise<ICartProduct[]> {
        try {
            let cart: ICartProduct[] = await JSON.parse(await this._redisClient.get(userEmail))
            if (cart === null) cart = []
            const index = cart.findIndex(el => el.product.id === product.id)
            if (index >= 0) {
                cart.splice(index, 1)
            }
            await this._redisClient.set(userEmail, JSON.stringify(cart))
            return cart
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async clearCart(userEmail: string): Promise<ICartProduct[]> {
        try {
            this._redisClient.set(userEmail, null)
            return await JSON.parse(await this._redisClient.get(userEmail))
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
