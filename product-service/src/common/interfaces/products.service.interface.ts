import { Product } from "src/products/entities/product.entity"

export interface IProductsService {
    findById(productId: number): Promise<Product>
    findAll(): Promise<Product[]>
    save(product: Product): Promise<Product>
    saveMany(product: Product[]): Promise<Product[]>
    removeOne(id: number): Promise<Product[]>
}