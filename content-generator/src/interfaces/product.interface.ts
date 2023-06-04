import { ICategory } from "./category.interface"

export interface IProduct {
    id?: number
    title: string
    description: string
    image?: string
    cost: number
    category: ICategory
}