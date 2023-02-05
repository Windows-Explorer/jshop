<template>
    <section>
        <q-inner-loading :showing="loading" dark />
        <product :product="product" v-for="(product, index) in products" :key="index"/>
    </section>
</template>

<script setup lang="ts">
import { Ref, ref } from "@vue/reactivity"
import { defineAsyncComponent, onMounted } from "@vue/runtime-core"
import { useStore } from "vuex"
import { IProduct } from "../common/interfaces/product.interface"

const store = useStore()

const ProductCard = defineAsyncComponent(async () => import("../components/ProductCard.vue"))

const products: Ref<IProduct[]> = ref<IProduct[]>([])
const loading: Ref<boolean> = ref(false)

const getContent = async () => {
    loading.value = true
    products.value = await store.dispatch("getProducts")
    loading.value = false
}
onMounted(async () => getContent())

</script>

<style scoped>
    section {
        width: 100%;
        height: 100%;
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
    }
</style>