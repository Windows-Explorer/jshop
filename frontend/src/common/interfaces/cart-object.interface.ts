import { IProduct } from "./product.interface"

export interface ICartObject extends IProduct {
    count: number
}