<template>
    <section>
        <q-inner-loading :showing="loading" dark />
        <categories-section />
        <products-carousel />
        <div class="pagination-container">
            <q-pagination v-model="page" :max="count.count" @update:model-value="getProducts()" />
        </div>
        <div class="products-section">
            <product-card :product="product" v-for="(product, index) in products" :key="index" />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { IProduct } from "../common/interfaces/product.interface"
import { Ref, onMounted, ref, defineAsyncComponent } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { IProductsFilter } from "../common/interfaces/products-filter.interface"

const HeaderLayout = defineAsyncComponent(async () => import("../components/HeaderLayout.vue"))
const ProductCard = defineAsyncComponent(async () => import("../components/ProductCard.vue"))
const CategoriesSection = defineAsyncComponent(async () => import("../components/CategoriesSection.vue"))
const ProductsCarousel = defineAsyncComponent(async () => import("../components/ProductsCarousel.vue"))

const store = useStore()
const router = useRouter()

const page: Ref<number> = ref(1)
const loading: Ref<boolean> = ref(false)

const filter: Ref<IProductsFilter> = ref(router.currentRoute.value.query)

const products: Ref<IProduct[]> = ref([])
const count: Ref<{ count: number }> = ref({ count: 0 })

const getProducts = async () => {
    count.value = await store.dispatch("getProductsCount", { page: page.value - 1, filter: filter.value })
    products.value = await store.dispatch("getProducts", { page: page.value - 1, filter: filter.value })
}

onMounted(async () => {
    getProducts()
})

</script>