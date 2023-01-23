<template>
    <q-card dark :style="'padding-block: 20px'">
        <q-form @submit="onSubmit()" class="form">
            <h5>Изменение</h5>
            <small style="color: red">валидаций нет</small>
            <q-input
                standout
                dark
                v-model="props.product.title"
                type="text"
                :label="'Заголовок товара'"
            />
            <q-input
                standout
                dark
                v-model="props.product.description"
                type="textarea"
                :label="'Описание'"
            />
            <q-input
                standout
                dark
                v-model="props.product.cost"
                type="text"
                :label="'Цена'"
            />
            <q-input
                standout
                dark
                v-model="props.product.type"
                type="text"
                :label="'Тип (book/game, потом что-нибудь умнее придумаю)'"
            />
            <q-file
                standout
                dark
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


import { PropType, ref, Ref } from "vue"
import { useStore } from "vuex"
import { IProduct } from "../../store/modules/products/product.interface"

const store = useStore()

const props = defineProps({
    product: {
        type: Object as PropType<IProduct>,
        required: true
    }
})
const emits = defineEmits<{
    (event: "productEdited"): void
}>()

const loading: Ref<boolean> = ref<boolean>(false)

const currentFile: Ref<File | null> = ref<File | null>(null)

const onSubmit = async () => {
    loading.value = true
    await store.dispatch("saveProduct", { product: props.product, file: currentFile.value })
    loading.value = false
    emits("productEdited")
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