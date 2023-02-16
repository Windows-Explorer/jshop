<template>
    <section>
        <q-inner-loading :showing="loading" dark />
        <categories-section />
        <products-carousel />
        <!-- <product-card :product="product" v-for="(product, index) in products" :key="index" /> -->
    </section>
</template>

<script lang="ts" setup>
import { IProduct } from "../common/interfaces/product.interface"
import { Ref, onMounted, ref, defineAsyncComponent } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router";
import { IProductsFilter } from "../common/interfaces/products-filter.interface";

const HeaderLayout = defineAsyncComponent(async () => import("../components/HeaderLayout.vue"))
const ProductCard = defineAsyncComponent(async () => import("../components/ProductCard.vue"))
const CategoriesSection = defineAsyncComponent(async () => import("../components/CategoriesSection.vue"))
const ProductsCarousel = defineAsyncComponent(async () => import("../components/ProductsCarousel.vue"))

const store = useStore()
const router = useRouter()

const loading: Ref<boolean> = ref(false)

const filter: Ref<IProductsFilter> = ref(router.currentRoute.value.query)

const products: Ref<IProduct[]> = ref([])

onMounted(async () => { 
    products.value = await store.dispatch("getProducts", { page: 0, filter: filter.value })
})

</script>