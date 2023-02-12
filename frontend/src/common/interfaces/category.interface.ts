import { ISubcategory } from "./subcategory.interface"

export interface ICategory {
    id: number
    name: string
    subcategories: ISubcategory[]
}