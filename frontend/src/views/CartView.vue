<template>
    <section>
        <div class="cart-header">
            <h5>Корзина</h5>
            <h5>Итого: {{ finalCost }}<small> ₽</small></h5>
        </div>
        
        <div class="main-container">
            <div class="cart-container">
                <product-cart
                    :product="product"
                    v-for="(product, index) in cart"
                    :key="index"
                    @update-count="onUpdateCount(index, $event)"
                />
            </div>
        </div>
        
    </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, Ref, ref } from "@vue/runtime-core"
import { useStore } from "vuex"
import { ICartObject } from "../store/modules/cart/cart-object.interface"

const ProductCart = defineAsyncComponent(async () => import("../components/ProductCart.vue"))
const store = useStore()

const cart: Ref<ICartObject[]> = ref([])
const finalCost: Ref<number> = ref(0)

const selected = ref()

const onUpdateCount = async (index: number, count: number): Promise<void> => {
    const cart: ICartObject[] = store.getters.cart
    cart[index].count = count
    await store.dispatch("updateCart", cart)
    calcFinalCost()
}

const calcFinalCost = async () => {
    let acc: number = 0
    cart.value.forEach( el => {
        acc += el.cost * el.count
    })
    finalCost.value = acc
}

onMounted(async () => {
    cart.value = store.getters.cart
    calcFinalCost()
})

</script>

<style scoped lang="scss">

h5 {
    margin: 0px;
}

.body--light h5 {
    color: $secondary
}

.body--dark h5 {
    color: $primary
}

section {
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-inline: 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: stretch;
    flex-wrap: nowrap;
}

.cart-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 20px;
    justify-content: flex-start;
    align-content: center;
}

.cart-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
}

.main-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.accept-card {
    top: 40px;
    position: sticky;
    width: 100%;
    height: 30%;
    padding: 10px;
    background-color: $primary;
}

</style>