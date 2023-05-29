<template>
    <div class="edit-categories-container">
        <div class="content">
            <VButton class="add-button" label="Добавить" :size="14" @click="showDialog = true" />
            <div class="list">
                <VEditableCategoryCard v-for="(category, index) in categories" :key="index" :category="category" />
            </div>
        </div>
        <VAddCategoryDialog :show="showDialog" @dialog-closed="showDialog = false"
            v-on:dialog-closed="categoriesStore.getCategories()" />
        <VFooter />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useCategoriesStore from '~/store/categories.store'

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const showDialog: Ref<boolean> = ref(false)

onMounted(async () => {
    categoriesStore.getCategories()
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