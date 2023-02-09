import { Product } from "src/products/entities/product.entity"
import { IProduct } from "./product.interface"
import { IProductsFilterPayload } from "./products-filter.interface"
import { IResultAndCount } from "./result-and-count.interface"

export interface IProductsService {
    findById(productId: number): Promise<IProduct>
    findAll(page: number, filter: IProductsFilterPayload): Promise<IProduct[] | IResultAndCount<IProduct[]>>
    save(product: IProduct): Promise<IProduct>
    saveMany(product: IProduct[]): Promise<IProduct[]>
    removeOne(id: number): Promise<void>
}