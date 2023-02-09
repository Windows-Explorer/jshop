<template>
    <section>
        <q-inner-loading :showing="loading" dark />
        <categories-section />
        <!-- <product-card :product="product" v-for="(product, index) in products" :key="index" /> -->
    </section>
</template>

<script lang="ts" setup>
import { IProduct } from "../common/interfaces/product.interface"
import { Ref, onMounted, ref, defineAsyncComponent } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router";

const ProductCard = defineAsyncComponent(async () => import("../components/ProductCard.vue"))
const CategoriesSection = defineAsyncComponent(async () => import("../components/CategoriesSection.vue"))

const store = useStore()
const router = useRouter()

const loading: Ref<boolean> = ref(false)

const products: Ref<{ result: IProduct[], count: number }> = ref({ result: [], count: 0})

</script>