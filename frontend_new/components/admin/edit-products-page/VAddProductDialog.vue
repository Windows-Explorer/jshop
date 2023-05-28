<template>
    <div class="wrapper">
        <div class="dialog">
            <input type="text" placeholder="Заголовок">
            <input type="text" placeholder="Описание">
            <input type="number" placeholder="Цена">
            <select v-model="product.category">
                <option v-for="(category, index) in categories" :key="index" :value="category"></option>
            </select>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ICategory } from '~/common/interfaces/data/category.interface'
import { IProduct } from '~/common/interfaces/data/product.interface'
import useCategoriesStore from '~/store/categories.store'

const product: Ref<IProduct> = ref({
    title: "",
    description: "",
    cost: 0,
    category: {
        name: "",
        description: ""
    }
})

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

onMounted(async () => {
    categoriesStore.getCategories()
})

</script>