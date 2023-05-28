<template>
    <div class="edit-product-container">
        <div class="content">
            <VButton class="add-button" label="Добавить" :size="14" />
            <VEditableProductCard v-for="(product, index) in products" :key="index" :product="product" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useProductsStore from '~/store/products.store'

const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)

onMounted(async () => {
    productsStore.getProducts()
})

</script>

<style lang="scss" scoped>
.add-button {
    box-shadow: none;
    background-color: $primary;
    color: $dark;
}
.edit-product-container {
    height: 100vh;
    background-color: transparent;
}
.content {
    margin-top: 160px;
    background-color: $secondary;
    padding: 16px;
}
</style>