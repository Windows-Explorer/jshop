import { defineStore } from "pinia"
import params from "~/params"
import useAuthStore from "./auth.store"
import { IProduct } from "~/common/interfaces/data/product.interface"

const useProductsStore = defineStore("products", () => {
    const products: Ref<IProduct[]> = ref([])

    async function getProducts() {
        try {
            const result = await fetch(`${params.api_host}/products`)
            if (result.ok) {
                products.value = await result.json()
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function saveProduct(product: IProduct, imageFile: File) {
        try {
            product.image = `${params.api_host}/images/${imageFile.name}`
            const authStore = useAuthStore()

            const result = await fetch(`${params.api_host}/products`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authStore.token}`
                },
                body: JSON.stringify(product)
            })
            if (result.ok) {
                const formData: FormData = new FormData()
                formData.append("file", imageFile)

                const imageUploadResult = await fetch(`${params.api_host}/products/image`, {
                    method: "POST",
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${authStore.token}`
                    },
                    body: formData
                })
                if (imageUploadResult.ok) {
                    console.log("saved")
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function removeProduct(id: number) {
        try {
            const authStore = useAuthStore()
            const result = await fetch(`${params.api_host}/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authStore.token}`
                }
            })
            if (result.ok) {
                console.log("removed")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return { products, getProducts, saveProduct, removeProduct }
})

export default useProductsStore