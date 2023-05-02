import { Injectable } from "@nestjs/common"
import { ICartProduct } from "src/common/interfaces/data/cart-product.interface"
import { ICartService } from "src/common/interfaces/services/cart.service.interface"
import { DeleteResult, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Product } from "src/products/entities/product.entity"
import { IProduct } from "src/common/interfaces/data/product.interface"
import { InjectRedis } from "@liaoliaots/nestjs-redis"
import Redis from "ioredis"

@Injectable()
export class CartService implements ICartService {
    constructor(
        @InjectRedis() private readonly _redisClient: Redis
    ) { }

    async findAll(userId: number): Promise<ICartProduct[]> {
        const result = await this._redisClient.get(userId.toString())
        return JSON.parse(result)
    }

    async save(cartProduct: ICartProduct): Promise<ICartProduct> {
        const cartProducts: ICartProduct[] = await JSON.parse(await this._redisClient.get(cartProduct.userId.toString()))
        cartProducts.push(cartProduct)
        await this._redisClient.set(cartProduct.userId.toString(), JSON.stringify(cartProducts))
        return cartProduct
    }

    async count(userId: any): Promise<{ count: number }> {
        throw new Error("Method not implemented.")
    }

    async remove(userId: number, cartProductId: number): Promise<DeleteResult> {
        throw new Error("Method not implemented.")
    }
}