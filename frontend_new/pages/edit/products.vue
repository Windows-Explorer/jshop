<template>
    <div class="edit-products-container">
        <div class="content">
            <VButton class="add-button" label="Добавить" :size="14" @click="showDialog = true" />
            <div class="list">
                <VEditableCategoryCard v-for="(category, index) in categories" :key="index" :category="category" />
            </div>
        </div>
        <VAddProductDialog :show="showDialog" @dialog-closed="showDialog = false" title="Добавить товар"
            v-on:dialog-closed="productsStore.getProducts()" />
        <VFooter />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useCategoriesStore from '~/store/categories.store'
import useProductsStore from '~/store/products.store'

const productsStore = useProductsStore()
const { categories } = storeToRefs(useCategoriesStore())

const showDialog: Ref<boolean> = ref(false)

onMounted(async () => {
    productsStore.getProducts()
})

</script>

<style lang="scss" scoped>
.add-button {
    box-shadow: none;
    background-color: $primary;
    color: $dark;
    align-self: flex-start;
}

.edit-product-container {
    height: 100vh;
    background-color: transparent;
}

.content {
    background-color: $dark;
    padding: 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
}

.list {
    padding: 16px 32px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background-color: $primary;
}
</style>