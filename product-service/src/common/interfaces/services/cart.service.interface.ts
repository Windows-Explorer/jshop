import { DeleteResult } from "typeorm"
import { ICartProduct } from "../data/cart-product.interface"

export interface ICartService {
    findAll(): Promise<ICartProduct[]>
    save(cartProduct: ICartProduct): Promise<ICartProduct>
    count(): Promise<{ count: number }>
    remove(id: number): Promise<DeleteResult>
}