<template>
    <section>
        <q-tabs class="categories" inline-label outside-arrows :align="'left'">
            <q-route-tab label="Все категории" icon="menu">
                <categories-menu :subcategories="subcategories" :categories="categories" />
            </q-route-tab>
            <q-route-tab
                v-show="categories.length > 0"
                v-for="(category, index) in categories" :key="index"
                :label="category.name"
            />
            <categories-tab-skeleton v-show="categories.length <= 0" />
        </q-tabs>        
    </section>
</template>

<script lang="ts" setup>
import { ICategory } from "../common/interfaces/category.interface"
import { ref, Ref } from "@vue/reactivity"
import { defineAsyncComponent, onMounted } from "@vue/runtime-core"
import { useStore } from "vuex"
import { ISubcategory } from "../common/interfaces/subcategory.interface"

const CategoriesMenu = defineAsyncComponent(async () => import("./CategoriesMenu.vue"))
const CategoriesTabSkeleton = defineAsyncComponent(async () => import("./skeletons/CategoriesTabSkeleton.vue"))

const store = useStore()
const categories: Ref<ICategory[]> = ref(store.getters.categories)
const subcategories: Ref<ISubcategory[]> = ref(store.getters.subcategories)
const menu: Ref<boolean> = ref(false)

const sortSubcategories = async () => {
}

onMounted(async () => {
    categories.value = await store.dispatch("getCategories")
    subcategories.value = await store.dispatch("getSubcategories")


})

</script>