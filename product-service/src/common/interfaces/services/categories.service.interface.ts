import { DeleteResult } from "typeorm"
import { ICategory } from "../data/category.interface"

export interface ICategoriesService {
    findAll(): Promise<ICategory[]>
    save(category: ICategory): Promise<ICategory>
    deleteAll(): Promise<DeleteResult>
}