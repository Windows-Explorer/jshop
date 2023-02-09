import { ICategory } from "./category.interface"
import { ISubcategory } from "./subcategory.interface"

export interface IProduct {
    id?: number
    title: string
    description: string
    image?: string
    cost: number
    category: ICategory
    subcategory?: ISubcategory
}