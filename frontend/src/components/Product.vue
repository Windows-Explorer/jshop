<template>
    <div class="product">
        <div class="image">
            <q-img :height="'200px'" :width="'250px'" :src="props.product.image" :fit="'cover'"/>
        </div>
        <div class="info">
            <h3>{{ props.product.title }}</h3>
            <div>
                <span class="price">{{ props.product.cost }}<small> ₽</small></span>
                <q-btn label="Подробнее" @click="toProduct(props.product.id)" />
                <q-btn v-if="!inCart" round color="primary" icon="shopping_cart" @click="onCart(props.product)" />
                <q-btn v-else round color="secondary" icon="shopping_cart" @click="toCart()">
                    <q-tooltip>
                        Перейти в корзину
                    </q-tooltip>
                </q-btn>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ICartObject } from "../store/modules/cart/cart-object.interface"
import { onMounted, PropType, ref, Ref } from "@vue/runtime-core"
import { QBtn, QImg, QTooltip, useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { IProduct } from "../store/modules/products/product.interface"

const router = useRouter()
const store = useStore()
const quasar = useQuasar()

const props = defineProps({
    product: {
        type: Object as PropType<IProduct> || Object as PropType<ICartObject>,
        required: true
    }
})

const inCart: Ref<boolean> = ref<boolean>(false)

const toProduct = async (id: number) => {
    router.push({ name: "product", params: { id: id }})
}
const toCart = async () => {
    router.push({ name: "cart" })
}

const onCart = async (product: IProduct) => {
    quasar.loading.show()
    const cartObject: ICartObject = {
        id: product.id, title: product.title, description: product.description,
        image: product.image, cost: product.cost, count: 0
    }

    await store.dispatch("pushIntoCart", cartObject)
    inCart.value = await isCarted(cartObject)
    quasar.loading.hide()
}

const isCarted = async (product: IProduct) => {
    const cart: ICartObject[] = await store.getters.cart

    const index = cart.map(el => el.id).indexOf(product.id)

    if(index !== -1) return true
    else return false
}



onMounted( async () => {
    inCart.value = await isCarted(props.product)
})

</script>

<style lang="sass" scoped>

.product
    background-color: $primary
    display: flex
    flex-direction: column
    align-items: center
    align-content: center
    padding: 16px
.image
    margin-bottom: 0px

.info h3
    font-size: 21px
    margin-bottom: 0px

.info
    width: 100%
.info div
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between

.price
    font-size: 18px
</style>