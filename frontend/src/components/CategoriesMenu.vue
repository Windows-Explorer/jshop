<template>
    <q-menu transition-show="jump-down" transition-hide="jump-up" fit class="categories-menu">
        <h5 style="text-align: center; margin: 0px; margin-block: 16px;">Категории</h5>
        <span v-if="categories.length === 0" style="cursor: default;" class="empty">
            Пусто
        </span>
        <q-list center v-for="(category, index) in props.categories" :key="index">
            <q-item clickable>
                <q-item-section class="categories-item">{{ category.name }}</q-item-section>
                <q-menu
                    class="categories-submenu"
                    anchor="top right" self="top left"
                    transition-show="scale" transition-hide="jump-left"
                >
                    <h3>{{ category.name }}</h3>
                    <div class="subcategories-list">
                        <span v-for="(subcategory, index) in category.subcategories" :key="index"
                            style="display: flex; align-items: center; cursor: pointer;"
                        >
                            {{ subcategory.name }}
                        </span>
                        <span v-if="category.subcategories.length === 0" style="cursor: default;" class="empty">
                            Пусто
                        </span>
                    </div>
                </q-menu>
            </q-item>
        </q-list>
    </q-menu>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import { ICategory } from "../common/interfaces/category.interface"

const props = defineProps({
    categories: {
        type: Object as PropType<ICategory[]>,
        required: true
    }
})

</script>