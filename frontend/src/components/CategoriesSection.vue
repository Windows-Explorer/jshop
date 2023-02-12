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
            <div class="skeleton-container" v-show="categories.length <= 0">
                <q-skeleton class="skeleton" type="text" v-for="index in [...Array(6).keys()]" :key="index" />
            </div>
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
<style scoped lang="scss">
.skeleton-container {
    display: flex;
    height: 90%;
    gap: 10px;
    .skeleton {
        margin: 0px;
        height: 100%;
        padding: 0px;
        width: 160px;
    }
}

</style>