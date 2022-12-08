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
import { IProduct } from "../store/modules/products/product.interface"

const store = useStore()

const Product = defineAsyncComponent(async () => import("../components/Product.vue"))

const products: Ref<IProduct[]> = ref<IProduct[]>([])
const loading: Ref<boolean> = ref(false)

const getContent = async () => {
    loading.value = true
    products.value = await store.dispatch("getGames")
    loading.value = false
}

onMounted(async () => getContent())

</script>

<style scoped>
    section {
        width: 100%;
        padding-top: 10px;
        color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        align-items: flex-start;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>