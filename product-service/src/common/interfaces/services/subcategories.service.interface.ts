import { ISubcategory } from "../data/subcategory.interface"

export interface ISubcategoriesService {
    findAll(): Promise<ISubcategory[]>
} 