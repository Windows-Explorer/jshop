import { Ref } from "vue"

export interface IFilter {
    name: Ref<string> | string | null
    color: Ref<string> | string | null
    type: Ref<string> | string | null
    pt: Ref<number> | number | null
    manacost: Ref<number> | number | null
}

export interface IFilterNamed {
    name: string
    value: any
}