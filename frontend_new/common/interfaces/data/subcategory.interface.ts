import { ICategory } from "./category.interface"

export interface ISubcategory {
    id: number
    name: string
    description: string
    category: ICategory
}