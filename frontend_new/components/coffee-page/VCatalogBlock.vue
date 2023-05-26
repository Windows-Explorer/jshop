<template>
    <div class="catalog-block-container">
        <div class="products-container">
            <VProductCard v-for="(product, index) in products" :key="index" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useCategoriesStore from '~/store/categories.store'
import useProductsStore from '~/store/products.store'
import useSubcategoriesStore from '~/store/subcategories.store'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const subcategoriesStore = useSubcategoriesStore()

const { products } = storeToRefs(productsStore)

onMounted(async () => {
    productsStore.getProducts()
    categoriesStore.getCategories()
    subcategoriesStore.getSubcategories()
})

</script>

<style lang="scss" scoped>
.catalog-block-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $primary;
}

.products-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>