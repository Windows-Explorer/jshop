<template>
    <section>
        <q-inner-loading :showing="loading" dark/>
        <product-card :product="product" v-for="(product, index) in products" :key="index" />
    </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, Ref } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const ProductCard = defineAsyncComponent(async () => import("../components/ProductCard.vue"))

const router = useRouter()
const store = useStore()

const loading: Ref<boolean> = ref(false)

const products: Ref<any> = ref()

const getContent = async () => {
    loading.value = true
    products.value = await store.dispatch("getProductById", router.currentRoute.value.params.id)
    loading.value = false
}

onMounted(async () => getContent() )

</script>

<style scoped>
    section {
        width: 100%;
        padding-top: 10px;
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