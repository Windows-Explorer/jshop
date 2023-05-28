<template>
    <div class="edit-categories-container">
        <div class="content">
            <VButton class="add-button" label="Добавить" :size="14" />
            <VEditableCategoryCard v-for="(category, index) in categories" :key="index" :category="category" />
        </div>
        <VAddCategoryDialog :show="showDialog" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useCategoriesStore from '~/store/categories.store'

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const showDialog: Ref<boolean> = ref(true)

onMounted(async () => {
    categoriesStore.getCategories()
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