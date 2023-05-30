import { DeleteResult } from "typeorm"
import { IProductsFilterPayload } from "../products-filter.interface"
import { IProduct } from "../data/product.interface"

export interface IProductsService {
    findById(productId: number): Promise<IProduct>
    findAll(): Promise<IProduct[]>
    count(page: number, filter: IProductsFilterPayload): Promise<{ count: number }>
    save(product: IProduct): Promise<IProduct>
    remove(id: number): Promise<DeleteResult>
}