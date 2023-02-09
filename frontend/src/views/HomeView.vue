<template>
    <section>
        <q-inner-loading :showing="loading" dark />
        {{  products }}
        <product :product="product" v-for="(product, index) in products" :key="index"/>
    </section>
</template>

<script lang="ts" setup>
import { IProduct } from "../common/interfaces/product.interface"
import { Ref, onMounted, ref } from "vue"
import { useStore } from "vuex"

const store = useStore()

const loading: Ref<boolean> = ref(false)
const products: Ref<IProduct[]> = ref([])

onMounted(async () => {
    loading.value = true
    products.value = await store.dispatch("getProducts")
    loading.value = false
})

</script>

<style scoped>
    section {
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: stretch;
    }
</style>