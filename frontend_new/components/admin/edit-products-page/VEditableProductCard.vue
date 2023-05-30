<template>
    <div class="product-card">
        <div class="product-content-container">
            <h2 class="product-title">{{ props.product.title }}</h2>
            <span class="product-description">{{ props.product.description }}</span>
            <div class="actions">
                <VButton class="edit-button" label="Редактировать" :size="12" style="box-shadow: none;"
                    @click="showDialog = true" />
                <VButton class="remove-button" label="Удалить" :size="12" style="box-shadow: none;"
                    @click="removeProduct()" />
            </div>
            <VAddProductDialog :show="showDialog" :product="props.product" v-on:dialog-closed="showDialog = false" title="Редактировать продукт" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import { IProduct } from "~/common/interfaces/data/product.interface";
import useProductsStore from "~/store/products.store"

const productsStore = useProductsStore()
const showDialog: Ref<boolean> = ref(false)

const props = defineProps({
    product: {
        type: Object as PropType<IProduct>,
        required: true
    }
})

async function removeProduct() {
    await productsStore.removeProduct(props.product.id!)
    await productsStore.getProducts()
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