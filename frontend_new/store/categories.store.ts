import { defineStore } from "pinia"
import { ICategory } from "~/common/interfaces/data/category.interface"
import params from "~/params"
import useAuthStore from "./auth.store"


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

    async function saveCategory(category: ICategory) {
        try {
            const authStore = useAuthStore()
            const result = await fetch(`${params.api_host}/products/categories`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authStore.token}`
                },
                body: JSON.stringify(category)
            })
            if (result.ok) {
                console.log("saved")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return { categories, getCategories, saveCategory }
})

export default useCategoriesStore