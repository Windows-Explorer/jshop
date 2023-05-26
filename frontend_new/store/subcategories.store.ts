import { defineStore } from "pinia"
import { ISubcategory } from "~/common/interfaces/data/subcategory.interface"
import params from "~/params"


const useSubcategoriesStore = defineStore("subcategories", () => {
    const subcategories: Ref<ISubcategory[]> = ref([])

    async function getSubcategories() {
        try {
            const result = await fetch(`${params.api_host}/products/subcategories`)
            if (result.ok) {
                subcategories.value = await result.json()
            }
        }
        catch (error) {

        }
    }

    return { subcategories, getSubcategories }
})

export default useSubcategoriesStore