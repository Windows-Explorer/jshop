<template>
    <header class="header">
        <div class="secondary-header">
            <h2 @click="router.push({ name: 'home'})">BULLSHIT</h2>
            <q-form class="search" @submit="onSearch()">
                <q-input v-model="filter.title" :style="{ width: '100%' }" filled>
                    <template v-slot:append>
                        <q-icon name="search" flat round />
                    </template>
                </q-input>
            </q-form>
            <q-btn icon="shopping_cart" size="20px" flat round color="primary" :to="{ name: 'cart'}" />
            <div class="feedback">
                <span>+7 (3952) 48-28-49</span>
                <span>Обратная связь</span>
            </div>
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