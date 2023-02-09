<template>
    <section class="categories">
        <q-btn
            flat
            square
            label="Все категории"
            icon="menu"
        />
        <q-btn
            v-for="(category, index) in categories" :key="index"
            flat
            square
            :label="category.name"
        />
        
    </section>
</template>

<script lang="ts" setup>
import { ICategory } from "../common/interfaces/category.interface"
import { ref, Ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import { useStore } from "vuex"

const store = useStore()
const categories: Ref<ICategory[]> = ref([])

onMounted(async () => {
    categories.value = await store.dispatch("getCategories")
})

</script>