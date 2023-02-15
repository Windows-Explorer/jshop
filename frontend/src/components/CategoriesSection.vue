<template>
    <section>
        <q-tabs class="categories" inline-label :align="'left'">
            <q-route-tab label="Все категории" icon="menu">
                <categories-menu :categories="categories" />
            </q-route-tab>
            <q-route-tab
                v-show="categories.length > 0"
                v-for="(category, index) in categories" :key="index"
                :label="category.name"
            />
            <div class="skeleton-container" v-show="loading">
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

const CategoriesMenu = defineAsyncComponent(async () => import("./CategoriesMenu.vue"))

const store = useStore()
const categories: Ref<ICategory[]> = ref(store.getters.categories)
const loading: Ref<boolean> = ref(true)

onMounted(async () => {
    loading.value = true
    categories.value = await store.dispatch("getCategories")
    loading.value = false
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