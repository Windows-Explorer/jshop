<template>
    <div class="product-card">
        <div class="product-image-container">
            <div class="product-image" :style="{ backgroundImage: `url(${props.cartProduct.product.image})` }"></div>
        </div>
        <div class="product-content-container">
            <h2 class="product-title">{{ props.cartProduct.product.title }}</h2>
            <span class="product-description">{{ props.cartProduct.product.description }}</span>
            <span class="product-cost">${{ props.cartProduct.product.cost }} руб.</span>
            <VButton class="add-cart-button" label="Удалить из корзины" :size="16" @click="removeProductFromCart()" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import { ICartProduct } from "~/common/interfaces/data/cart-product.interface"
import useAuthStore from "~/store/auth.store"
import useCartStore from "~/store/cart.store"

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const emit = defineEmits(["productRemoved"])

const props = defineProps({
    cartProduct: {
        type: Object as PropType<ICartProduct>,
        required: true
    }
})

async function removeProductFromCart() {
    if (authStore.token) {
        await cartStore.removeProductFromCart(props.cartProduct.product)
        emit("productRemoved")
    }
    else {
        router.push({ name: "signin" })
    }
}

</script>

<style scoped lang="scss">
.add-cart-button {
    background-color: $accent;
    color: $primary;
    box-shadow: 0px 0px 0px 0px $primary;
}

.product-card {
    padding: 20px;
    // width: 100%;
    height: auto;
    background-color: $primary;
    margin-top: 10px;
    display: flex;
    gap: 16px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
}

.product-image-container {
    background-color: $secondary;
    height: 216px;
    width: 216px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
}

.product-image {
    // background: url("https://ld-wt73.template-help.com/tf/beans/coffe/images/product-01-116x205.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    height: 205px;
    width: 100%;
}

.product-content-container {
    // width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-title {
    font-family: 'Nunito', sans-serif;
    color: $accent;
    margin: 0px;
}

.product-description {
    font-family: 'RobotoSlab', sans-serif;
    font-size: medium;
}

.product-cost {
    font-family: 'Nunito', sans-serif;
    font-size: x-large;
}

@media screen and (max-width: 700px) {
    .product-card {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .product-content-container {
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 16px;
    }
}
</style>