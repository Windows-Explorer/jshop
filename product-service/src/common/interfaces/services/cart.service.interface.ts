import { ICartProduct } from "../data/cart-product.interface"

export interface ICartService {
    findAll(userEmail: string): Promise<ICartProduct[]>
    save(cartProduct: ICartProduct): Promise<ICartProduct>
    count(userEmail: string): Promise<{ count: number }>
    remove(cartProduct: ICartProduct): Promise<string>
}