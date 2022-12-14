<template>
    <q-card dark :style="'padding-block: 20px'">
        <span>Create</span>
        <q-form @submit="onSubmit()" class="form">
            <q-input
                standout
                dark
                v-model="currentProduct.title"
                type="text"
                :label="'Title'"
            />
            <q-input
                standout
                dark
                v-model="currentProduct.description"
                type="textarea"
                :label="'Description'"
            />
            <q-input
                standout
                dark
                v-model="currentProduct.cost"
                type="number"
                :label="'Cost'"
            />
            <q-file
                standout
                dark
                v-model="currentFile"
                :label="'Image'"
            />

            <span class="buttons">
                <q-btn label="Submit" type="submit" dark color="primary" :size="'18px'" />
            </span>
        </q-form>
    </q-card>
</template>

<script setup lang="ts">


import { useQuasar } from "quasar"
import { ref, Ref } from "vue"
import { useStore } from "vuex"
import { IProduct } from "../../store/modules/products/product.interface"

const store = useStore()
const quasar = useQuasar()

const currentProduct: Ref<IProduct> = ref<IProduct>({
    id: 0, description: "", cost: 0, title: "", image: "", type: "product"
})
const currentFile: Ref<File | null> = ref<File | null>(null)

const onSubmit = async () => {
    const result = await store.dispatch("saveOneProduct", { product: currentProduct.value, file: currentFile.value })
    console.log(result)
}


</script>
