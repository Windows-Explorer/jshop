<template>
    <section>
        <q-table
            :style="'width: 100%'"
            :rows="products"
            dark
            :columns="columns"
            :rows-per-page-options="[]"
            row-key="name"
            :loading="loading"
        >
            <template v-slot:top>
                <q-btn color="primary" :disable="loading" label="Add product" @click="onCreate()" />
                <q-dialog v-model="dialog">
                    <create-product />
                </q-dialog>
            </template>
            <template v-slot:body="props">
                
                <q-tr :props="props">
                    <q-td key="id" :props="props">
                        {{ props.row.id }}
                    </q-td>
                    <q-td key="title" :props="props">
                        {{ props.row.title }}
                        <q-popup-edit v-model="props.row.title" buttons v-slot="scope">
                            <q-input type="text" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="description" :props="props">
                        <p>
                            {{ props.row.description }}
                        </p>
                        <q-popup-edit v-model="props.row.description" buttons v-slot="scope">
                            <q-input type="textarea" v-model.trim="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="type" :props="props">
                        <p>
                            {{ props.row.type }}
                        </p>
                        <q-popup-edit v-model="props.row.type" buttons v-slot="scope">
                            <q-input type="text" v-model.trim="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="image" :props="props">
                        <p>
                            {{ props.row.image }}
                        </p>
                        <q-popup-edit v-model="props.row.image" buttons v-slot="scope">
                            <q-input type="text" v-model.trim="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="removeBtn" :props="props">
                        <q-btn color="negative" label="Remove" @click="onRemove(props.row.id)" />
                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <q-btn label="Submit" color="positive" :style="'width: 100px'" @click="onSubmit()"/>
    </section>
    
</template>


<script setup lang="ts">

import { defineAsyncComponent, onMounted, Ref, ref } from "@vue/runtime-core"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { IProduct } from "../../store/modules/products/product.interface"

const CreateProduct = defineAsyncComponent(async () => import("../../components/admin/CreateProduct.vue"))

const router = useRouter()
const quasar = useQuasar()
const store = useStore()

const columns: any[] = [
  { name: "id", align: "left", label: "id", field: "id" },
  { name: "title", align: "left", label: "Title", field: "title" },
  { name: "description", align: "left", label: "Description", field: "description" },
  { name: "type", align: "left", label: "Type", field: "type" },
  { name: "image", align: "left", label: "Image", field: "image" },
  { name: "removeBtn", align: "left", label: "Actions", field: "type" },
]

const products: Ref<IProduct[]> = ref<IProduct[]>([])
const loading: Ref<boolean> = ref<boolean>(false)
const dialog: Ref<boolean> = ref<boolean>(false)

const onCreate = async () => {
    dialog.value = true
}

const onRemove = async (id: number) => {
    loading.value = true
    products.value = await store.dispatch("removeOneProduct", id)
    loading.value = false
}

const onSubmit = async () => {
    await store.dispatch("saveManyProducts", products.value)
}

onMounted(async () => {
    products.value = await store.dispatch("getProducts")
})

</script>

<style scoped>
p {
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   }
</style>

<style lang="sass" scoped>
section
    width: 100%
    height: 100%
    padding-top: 10px
    padding-inline: 20px
    color: white
    display: flex
    gap: 10px
    flex-direction: column
    align-items: stretch
    flex-wrap: nowrap
</style>