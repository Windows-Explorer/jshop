<template>
    <div class="category-card">
        <div class="category-content-container">
            <h2 class="category-title">{{ props.category.name }}</h2>
            <span class="category-description">{{ props.category.description }}</span>
            <VButton class="edit-button" label="Редактировать" :size="16" />
            <VButton class="remove-button" label="Удалить" :size="16" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import { ICategory } from "~/common/interfaces/data/category.interface"


const props = defineProps({
    category: {
        type: Object as PropType<ICategory>,
        required: true
    }
})

</script>

<style scoped lang="scss">
.edit-button {
    background-color: $error;
}

.product-card {
    display: flex;
}
</style>