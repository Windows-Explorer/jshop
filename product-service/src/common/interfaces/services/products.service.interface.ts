import { DeleteResult } from "typeorm"
import { IProduct } from "../data/product.interface"

export interface IProductsService {
    findById(productId: number): Promise<IProduct>
    findAll(): Promise<IProduct[]>
    save(product: IProduct): Promise<IProduct>
    remove(id: number): Promise<DeleteResult>
}