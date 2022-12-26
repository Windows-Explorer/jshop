<template>
    <section>
        <product-carousel class="section_item" style="height: calc(100vh - 48px); width: 100%; z-index: 1000;" />
        <div class="page">
            <div class="darker"></div>
            <q-card class="card">
                Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text 
            </q-card>
        </div>
    </section>
</template>

<script lang="ts" setup>

import { defineAsyncComponent } from "@vue/runtime-core"


const ProductCarousel = defineAsyncComponent(async () => import("../components/ProductCarousel.vue"))

</script>

<style scoped>
    section {
        width: 100%;
        height: auto;
        color: white;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: stretch;
    }
    .page {
        height: 100vh;
        background: url("../assets/images/1.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: flex-end;
        justify-content: center;
        align-items: stretch;
    }
    .darker {
        position: absolute;
        background: linear-gradient(180deg, rgba(0,0,0,0.9) 12%, rgba(0,0,0,0) 95%);
        height: 100%;
        width: 100%;
    }
</style>

<style lang="sass" scoped>
.card
    margin-right: 200px
    color: $primary
    padding: 10px
    height: 400px

</style>