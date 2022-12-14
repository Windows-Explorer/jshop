<template>
    <q-card dark :style="'padding-block: 20px'">
        <span>Create</span>
        <q-form @submit="onSubmit()" class="form">
            <q-input
                standout
                dark
                v-model="currentProduct.title"
                :label="'Title'"
            />
            <q-input
                standout
                dark
                v-model="currentProduct.description"
                :label="'Description'"
            />
            <q-input
                standout
                dark
                v-model="currentProduct.cost"
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
import { ref, Ref } from "vue"
import { useStore } from "vuex"
import { IProduct } from "../../store/modules/products/product.interface"

const store = useStore()

const currentProduct: Ref<IProduct> = ref<IProduct>({
    id: 0, description: "", cost: 0, title: "", image: ""
})
const currentFile: Ref<File | null> = ref<File | null>(null)

const onSubmit = async () => {
    await store.dispatch("saveOne", currentProduct.value)
}

</script>
