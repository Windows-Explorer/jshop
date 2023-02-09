import { Ref } from "vue"

export interface IProductsFilter {
    title: Ref<string> | string | null
    cost: Ref<string> | string | null
    categoryName: Ref<string> | string | null
    subcategoryName?: Ref<string> | string | null
}