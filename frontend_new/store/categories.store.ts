import { defineStore } from "pinia"
import { ICategory } from "~/common/interfaces/data/category.interface"
import params from "~/params"


const useCategoriesStore = defineStore("categories", () => {
    const categories: Ref<ICategory[]> = ref([])

    async function getCategories() {
        try {
            const result = await fetch(`${params.api_host}/products/categories`)
            if (result.ok) {
                categories.value = await result.json()
            }
        }
        catch (error) {

        }
    }

    return { categories, getCategories }
})

export default useCategoriesStore