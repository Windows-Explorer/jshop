<template>
    <q-card>
        <q-form @submit="onSubmit()" class="form">
            <h5>Добавить</h5>
            <q-input
                v-model="currentProduct.title"
                type="text"
                label="Заголовок товара"
            />
            <q-input
                v-model="currentProduct.description"
                type="textarea"
                label="Описание"
            />
            <q-input
                v-model="currentProduct.cost"
                type="number"
                label="Цена"
            />
            <q-select :loading="loadingCategories" v-model="currentProduct.category" :options="optionsCategories" label="Категория" />
            <q-select :loading="loadingCategories" v-model="currentProduct.subcategory" :options="currentProduct.category?.subcategories" label="Подкатегория" />
            <q-file
                v-model="currentFile"
                label="Изображение"
            >
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
            </q-file>
            <span class="buttons">
                <q-btn label="Сохранить" :loading="loading" type="submit" flat :size="'18px'"/>
            </span>
        </q-form>
    </q-card>
</template>

<script setup lang="ts">

import { ICategory } from "../../common/interfaces/category.interface"
import { onMounted, ref, Ref } from "vue"
import { useStore } from "vuex"
import { IProduct } from "../../common/interfaces/product.interface"

const store = useStore()

const emits = defineEmits<{
    (event: "productCreated"): void
}>()

const loading: Ref<boolean> = ref<boolean>(false)
const loadingCategories: Ref<boolean> = ref<boolean>(false)
const categories: Ref<ICategory[]> = ref([])
const optionsCategories: Ref<string[]> = ref([])

const currentProduct: Ref<IProduct | any> = ref({
    title: "",
    cost: 0,
    description: "",
    category: undefined,
    subcategory: undefined

})
const currentFile: Ref<File | null> = ref(null)

const getCategories = async () => {
    loadingCategories.value = true
    categories.value = await store.dispatch("getCategories")
    optionsCategories.value = categories.value.map(el => el.name)
    loadingCategories.value = false
}

onMounted(async () => {
    getCategories()
})

const onSubmit = async () => {
    loading.value = true
    currentProduct.value.category = categories.value.find(el => el.name === currentProduct.value.category)
    await store.dispatch("saveProduct", { product: currentProduct.value, file: currentFile.value })
    loading.value = false
    emits("productCreated")
}


</script>

<style lang="sass" scoped>
h5
    margin: 10px 0px
    font-size: 32px
    text-align: center
    width: 100%

.formEdit
    padding: 20px
    display: flex
</style>