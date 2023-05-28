<template>
    <Teleport to="body">
        <div class="wrapper" v-if="props.show">
            <div class="dialog">
                <h2>Добавить категорию</h2>
                <input type="text" v-model="category.name" placeholder="Название">
                <input type="text" v-model="category.description" placeholder="Описание">
                <VButton class="submit" label="Добавить" @click="onSubmit()" />
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import { ICategory } from '~/common/interfaces/data/category.interface'
import useCategoriesStore from '~/store/categories.store'

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
})

const category: Ref<ICategory> = ref({
    name: "",
    description: ""
})

const categoriesStore = useCategoriesStore()

async function onSubmit() {
    await categoriesStore.saveCategory(category.value)
}

</script>