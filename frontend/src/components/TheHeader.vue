<template>
    <header class="header">
        <div class="logo">
            <span>GOOD SHOP</span>
        </div>
        <div class="routes">
            <router-link active-class="route-label-active" class="route-label" :to="{ name: 'home' }">Магазин</router-link>
            <router-link active-class="route-label-active" class="route-label" :to="{ name: 'home' }">Контакты</router-link>
            <router-link active-class="route-label-active" class="route-label" :to="{ name: 'home' }">О нас</router-link>
        </div>
        <div class="routes">
            <router-link class="route-label" :to="{ name: 'home' }">
                <q-icon name="favorite" />
            </router-link>
        </div>
    </header>
</template>

<script lang="ts" setup>

import { ISearch } from "../common/interfaces/search.interface"
import { defineAsyncComponent, ref, Ref } from "@vue/runtime-core"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import { Search } from "../common/search"
import { IProductsFilter } from "../common/interfaces/products-filter.interface"

const store = useStore()
const router = useRouter()
const route = useRoute()
const search: ISearch = new Search(router)
const filter: Ref<IProductsFilter> = ref({})

const onSearch = async () => {
    search.find(filter.value)
}

</script>

<style lang="scss" scoped>
.header {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    padding: 6px 30px;
    height: 80px;
    background-color: $accent;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 25px 0px
}
.routes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    height: 100%;
}
.route-label {
    color: $primary;
    text-decoration: none;
    font-size: medium;
    height: 100%;
    align-items: center;
    display: flex;
    padding: 6px;
    transition: 0.5s ease;
}
.route-label:hover {
    color: $active
}
.route-label-active {
    // color: $active
}
.logo {
    font-size: x-large;
}
</style>