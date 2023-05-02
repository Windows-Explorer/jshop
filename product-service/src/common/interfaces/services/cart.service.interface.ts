import { ICartProduct } from "../data/cart-product.interface"

export interface ICartService {
    findAll(userId: number): Promise<ICartProduct[]>
    save(cartProduct: ICartProduct): Promise<ICartProduct>
    count(userId): Promise<{ count: number }>
    remove(cartProduct: ICartProduct): Promise<string>
}