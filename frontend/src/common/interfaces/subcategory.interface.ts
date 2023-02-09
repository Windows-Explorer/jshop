import { ICategory } from "./category.interface"

export interface ISubcategory {
    id: number
    name: string
    category: ICategory
}