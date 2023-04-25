import { IProduct } from "./product.interface"

export interface ICartProduct extends IProduct {
    count: number
}