import { Product } from "src/products/entities/product.entity"
import { DeleteResult } from "typeorm"
import { IProduct } from "./product.interface"
import { IProductsFilterPayload } from "./products-filter.interface"
import { IResultAndCount } from "./result-and-count.interface"

export interface IProductsService {
    findById(productId: number): Promise<IProduct>
    findAll(page: number, filter: IProductsFilterPayload): Promise<IProduct[]>
    count(page: number, filter: IProductsFilterPayload): Promise<{ count: number }>
    save(product: IProduct): Promise<IProduct>
    remove(id: number): Promise<DeleteResult>
}