import { IProduct } from "./product.interface"

export interface ICartProduct {
    userId?: number
    product: IProduct
    count: number
}