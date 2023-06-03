import { ICartProduct } from "../data/cart-product.interface"
import { IProduct } from "../data/product.interface"

export interface ICartService {
    getCart(userEmail: string): Promise<ICartProduct[]>
    addProductToCart(userEmail: string, product: IProduct): Promise<ICartProduct[]>
    removeProductFromCart(userEmail: string, product: IProduct): Promise<ICartProduct[]>
    clearCart(userEmail: string): Promise<ICartProduct[]>
}