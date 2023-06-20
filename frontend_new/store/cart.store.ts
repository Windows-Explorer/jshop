import { defineStore } from "pinia"
import { ICartProduct } from "~/common/interfaces/data/cart-product.interface"
import useAuthStore from "./auth.store"
import { IProduct } from "~/common/interfaces/data/product.interface"
import params from "~/params"

const useCartStore = defineStore("cart", () => {
    const authStore = useAuthStore()

    const cart: Ref<ICartProduct[]> = ref([])

    async function getCart() {
        const response = await fetch(`${params.api_host}/cart`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authStore.token}`
            }
        })
        if (response.status === 201 || response.status === 200) {
            cart.value = await response.json()
        }
        else {
            cart.value = []
        }
    }

    async function addProductToCart(product: IProduct) {
        await fetch(`${params.api_host}/cart/addproducttocart`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authStore.token}`
            },
            body: JSON.stringify(product)
        })
    }

    async function removeProductFromCart(product: IProduct) {
        const response = await fetch(`${params.api_host}/cart/removeproductfromcart`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authStore.token}`
            },
            body: JSON.stringify(product)
        })
    }

    return { cart, getCart, addProductToCart, removeProductFromCart }
})

export default useCartStore