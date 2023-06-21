<template>
    <div class="cart-block-container">
        <div class="cart-container">
            <VCartProductCard v-for="(cartProduct, index) in cart" :key="index" :cartProduct="cartProduct"
                @product-removed="cartStore.getCart()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useCartStore from "../../store/cart.store"
import { onMounted } from "vue"

const cartStore = useCartStore()

const { cart } = storeToRefs(cartStore)

onMounted(async () => {
    cartStore.getCart()
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