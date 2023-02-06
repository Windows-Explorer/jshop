<template>
    <q-card>
        <q-form @submit="onSubmit()" class="form">
            <h5>Создание</h5>
            <q-input
                v-model="currentProduct.title"
                type="text"
                :label="'Заголовок товара'"
            />
            <q-input
                v-model="currentProduct.description"
                type="textarea"
                :label="'Описание'"
            />
            <q-input
                v-model="currentProduct.cost"
                type="number"
                :label="'Цена'"
            />
            <q-input
                v-model="currentProduct.type"
                type="text"
                :label="'Тип (book/game, потом что-нибудь умнее придумаю)'"
            />
            <q-file
                v-model="currentFile"
                :label="'Изображение'"
            >
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
            </q-file>

            <span class="buttons">
                <q-btn label="Сохранить" :loading="loading" type="submit" dark color="primary" :size="'18px'"/>
            </span>
        </q-form>
    </q-card>
</template>

<script setup lang="ts">

import { ref, Ref } from "vue"
import { useStore } from "vuex"
import { IProduct } from "../../common/interfaces/product.interface"

const store = useStore()

const emits = defineEmits<{
    (event: "productCreated"): void
}>()

const loading: Ref<boolean> = ref<boolean>(false)

const currentProduct: Ref<IProduct> = ref<IProduct>({
    id: 0, description: "", cost: 0, title: "", image: "", type: "product"
})
const currentFile: Ref<File | null> = ref<File | null>(null)

const onSubmit = async () => {
    loading.value = true
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