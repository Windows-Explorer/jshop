import { defineStore } from "pinia"
import { ICartProduct } from "~/common/interfaces/data/cart-product.interface"
import useAuthStore from "./auth.store"
import params from "~/params"
import { IProduct } from "~/common/interfaces/data/product.interface"

const useCartStore = defineStore("cart", () => {
    const authStore = useAuthStore()

    const cart: Ref<ICartProduct[]> = ref([])

    async function getCart() {
        if (await authStore.isAuthorized()) {
            const result = await fetch(`${params.api_host}/cart`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authStore.token}`
                }
            })
            if (result.ok) {
                cart.value = await result.json()
            }
        }
        else {
            const cartCookie = useCookie("cart")
            if (cartCookie.value) {
                cart.value = JSON.parse(cartCookie.value)
            }
        }
    }

    async function addProductToCart(product: IProduct) {
        let base64Url = authStore.token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        const JSONdataFromToken = await JSON.parse(jsonPayload)
        const userEmail: string = JSONdataFromToken

        let cartProduct: ICartProduct = {
            count: 1,
            product: product,
            userEmail: userEmail
        }

        let findedCartProductIndex = 0
        const findedCartProduct = cart.value.find((value, index) => {
            if (value.product === product) {
                findedCartProductIndex = index
                return true
            }
            return false
        })

        if (findedCartProduct) {
            cart.value[findedCartProductIndex].count++
        }
        else {
            cart.value.push(cartProduct)
        }
    }

    async function removeProductFromCart(product: IProduct) {
        const findedCartProductIndex = cart.value.findIndex((value) => value.product === product)
        cart.value.splice(findedCartProductIndex, 1)
    }

    return { cart, getCart, addProductToCart, removeProductFromCart }
})

export default useCartStore