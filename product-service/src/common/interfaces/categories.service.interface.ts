import { ICategory } from "./category.interface"

export interface ICategoriesService {
    findAll(): Promise<ICategory[]>
}