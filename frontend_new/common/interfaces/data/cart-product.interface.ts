import { IProduct } from "./product.interface"

export interface ICartProduct {
    userEmail?: string
    product: IProduct
    count: number
}