import { ISubcategory } from "./subcategory.interface"

export interface ISubcategoriesService {
    findAll(): Promise<ISubcategory[]>
} 