import { IProduct } from "../types/product.interface"

export interface IProductsService {
    findById(productId: number): Promise<IProduct>
    findAll(): Promise<IProduct[]>
    save(product: IProduct): Promise<IProduct>
    saveMany(product: IProduct[]): Promise<IProduct[]>
    removeOne(id: number): Promise<IProduct[]>
}