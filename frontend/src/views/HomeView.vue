<template>
    <section>
        <product-carousel style="height: 100%; width: 100%; z-index: 1000;" />
    </section>
</template>

<script lang="ts" setup>

import { defineAsyncComponent } from "@vue/runtime-core"


const ProductCarousel = defineAsyncComponent(async () => import("../components/ProductCarousel.vue"))

</script>

<style scoped>
    section {
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: stretch;
    }
</style>