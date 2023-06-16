import { DeleteResult } from "typeorm"
import { IProduct } from "../data/product.interface"

export interface IProductsService {
    findById(productId: number, categoryName?: string): Promise<IProduct>
    findAll(categoryName?: string): Promise<IProduct[]>
    save(product: IProduct): Promise<IProduct>
    remove(id: number): Promise<DeleteResult>
}