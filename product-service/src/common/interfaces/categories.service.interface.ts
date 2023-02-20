import { DeleteResult } from "typeorm"
import { ICategory } from "./category.interface"

export interface ICategoriesService {
    findAll(): Promise<ICategory[]>
    save(category: ICategory): Promise<ICategory>
    deleteAll(): Promise<DeleteResult>
}