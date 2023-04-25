import { Injectable } from "@nestjs/common"
import { ICartProduct } from "src/common/interfaces/data/cart-product.interface"
import { ICartService } from "src/common/interfaces/services/cart.service.interface"
import { DeleteResult, Repository } from "typeorm"
import { CartProduct } from "./entities/cart-product.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class CartService implements ICartService {
    constructor(
        @InjectRepository(CartProduct) private readonly _cartProductRepository: Repository<ICartProduct>
    ) { }

    async findAll(): Promise<ICartProduct[]> {
        return await this._cartProductRepository.find()
    }

    async save(cartProduct: ICartProduct): Promise<ICartProduct> {
        return await this._cartProductRepository.save(cartProduct)
    }

    async count(): Promise<{ count: number }> {
        return { count: await this._cartProductRepository.count() }
    }

    async remove(id: number): Promise<DeleteResult> {
        return this._cartProductRepository.delete(id)
    }

}