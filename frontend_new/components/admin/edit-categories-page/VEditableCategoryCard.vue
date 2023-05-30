<template>
    <div class="category-card">
        <div class="category-content-container">
            <h2 class="category-title">{{ props.category.name }}</h2>
            <span class="category-description">{{ props.category.description }}</span>
            <div class="actions">
                <VButton class="edit-button" label="Редактировать" :size="12" style="box-shadow: none;"
                    @click="showDialog = true" />
                <VButton class="remove-button" label="Удалить" :size="12" style="box-shadow: none;"
                    @click="removeCategory()" />
            </div>
            <VAddCategoryDialog :show="showDialog" :category="props.category" v-on:dialog-closed="showDialog = false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import { ICategory } from "~/common/interfaces/data/category.interface"
import useCategoriesStore from "~/store/categories.store"

const categoriesStore = useCategoriesStore()
const showDialog: Ref<boolean> = ref(false)

const props = defineProps({
    category: {
        type: Object as PropType<ICategory>,
        required: true
    }
})

async function removeCategory() {
    await categoriesStore.removeCategory(props.category.id!)
    await categoriesStore.getCategories()
}

</script>

<style scoped lang="scss">
.remove-button {
    background-color: $error;
}

.edit-button {
    background-color: $accent;
}

.actions {
    display: flex;
    gap: 12px;
}

.category-card {
    display: flex;
    margin-block: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 4px 20px;
    border-radius: 4px;
    font-family: 'Nunito', sans-serif;
    color: $dark;
}

.category-title {
    font-size: large;
}

.category-content-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
</style>