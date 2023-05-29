<template>
    <Teleport to="body">
        <Transition name="dialog">
            <div class="wrapper" v-if="props.show" @click="emits('dialogClosed')">
                <div class="dialog" @click.stop>
                    <h2>Добавить категорию</h2>
                    <input type="text" v-model="category.name" placeholder="Название">
                    <input type="text" v-model="category.description" placeholder="Описание">
                    <VButton class="submit" label="Добавить" @click="onSubmit()" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import { ICategory } from '~/common/interfaces/data/category.interface'
import useCategoriesStore from '~/store/categories.store'

const emits = defineEmits(["dialogClosed"])

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
    emits("dialogClosed")
}

</script>

<style lang="scss" scoped>
.submit {
    box-shadow: none;
    color: $primary;
    background-color: $accent;
    margin-top: 12px;
}

.dialog-enter-active,
.dialog-leave-active {
    transition: 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}
</style>