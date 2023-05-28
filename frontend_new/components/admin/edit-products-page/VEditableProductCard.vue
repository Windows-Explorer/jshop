<template>
    <div class="product-card">
        <div class="product-image-container">
            <div class="product-image" :style="{ background: `url(${props.product.image})` }"></div>
        </div>
        <div class="product-content-container">
            <h2 class="product-title">{{ props.product.title }}</h2>
            <span class="product-description">{{ props.product.description }}</span>
            <span class="product-cost">${{ props.product.cost }}</span>
            <VButton class="edit-button" label="Редактировать" :size="16" />
            <VButton class="remove-button" label="Удалить" :size="16" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import { IProduct } from "~/common/interfaces/data/product.interface"


const props = defineProps({
    product: {
        type: Object as PropType<IProduct>,
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