<template>
    <div>
        {{ cart }}
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { IProduct } from "../store/modules/products/product.interface";

const store = useStore()

const cart: Ref<IProduct[]> = ref<IProduct[]>([])

onMounted(async () => {
    cart.value = await store.state.cartState
})

</script>