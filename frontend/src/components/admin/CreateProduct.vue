<template>
    <q-card>
        <q-form @submit="onSubmit()" class="form">
            <h5>Добавить</h5>
            <q-input
                v-model="currentProduct.title"
                type="text"
                label="Заголовок товара"
                :rules="validationRules.title"
                no-error-icon
            />
            <q-input
                v-model="currentProduct.description"
                type="textarea"
                label="Описание"
                :rules="validationRules.description"
                no-error-icon
                counter
                maxlength="255"
            />
            <q-input
                v-model="currentProduct.cost"
                type="number"
                label="Цена"
                :rules="validationRules.cost"
                no-error-icon
            />
            <q-select
                :loading="loadingCategories"
                v-model="currentProduct.category"
                :options="optionsCategories"
                label="Категория"
                :rules="validationRules.categories"
                no-error-icon
            />
            <q-select
                :loading="loadingCategories"
                v-model="currentProduct.subcategory"
                :options="currentProduct.category?.subcategories"
                label="Подкатегория"
                no-error-icon
            />
            <q-file
                v-model="currentFile"
                label="Изображение"
                :rules="validationRules.image"
                no-error-icon
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
import { Validator } from "../../common/validation/validator"

const store = useStore()
const validator = new Validator()

const emits = defineEmits<{
    (event: "productCreated"): void
}>()

const loading: Ref<boolean> = ref<boolean>(false)
const loadingCategories: Ref<boolean> = ref<boolean>(false)
const categories: Ref<ICategory[]> = ref([])
const optionsCategories: Ref<string[]> = ref([])


const validationRules = {
    title: [
        async (value: string) => await validator.isRequired(value),
        async (value: string) => await validator.minLength(value, 4),
        async (value: string) => await validator.maxLength(value, 255)
    ],
    description: [
        async (value: string) => await validator.isRequired(value),
        async (value: string) => await validator.minLength(value, 4),
        async (value: string) => await validator.maxLength(value, 255)
    ],
    cost: [
        async (value: string) => await validator.isRequired(value)
    ],
    categories: [
        async (value: string) => await validator.isRequired(value)
    ],
    image: [
        async (value: string) => await validator.isRequired(value)
    ]
}

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