import { ISubcategory } from "./subcategory.interface"

export interface ICategory {
    id?: number
    name: string,
    description: string,
    subcategories?: ISubcategory[]
}