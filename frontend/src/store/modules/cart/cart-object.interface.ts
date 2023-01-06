import { IProduct } from "../products/product.interface"

export interface ICartObject extends IProduct {
    count: number
}