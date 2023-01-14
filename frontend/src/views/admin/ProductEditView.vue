<template>
    <section class="page-section"> 
        <q-table
            :style="'width: 100%'"
            :rows="products"
            dark
            :columns="columns"
            :rows-per-page-options="[]"
            row-key="name"
            :loading="loading"
            class="table"
        >
            <template v-slot:top>
                <q-btn color="primary" :disable="loading" label="Создать" @click="onShowCreate()" />
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="id" :props="props">
                        {{ props.row.id }}
                    </q-td>
                    <q-td key="title" :props="props">
                        {{ props.row.title }}
                    </q-td>
                    <q-td key="description" :props="props">
                        {{ props.row.description }}
                    </q-td>
                    <q-td key="type" :props="props">
                        {{ props.row.type }}
                    </q-td>
                    <q-td key="image" :props="props">
                        <q-img :src="props.row.image" />
                    </q-td>
                    <q-td key="removeBtn" :props="props">
                        <div class="actionsContainer">
                            <q-btn color="negative" label="Удалить" :disable="loading" @click="onRemove(props.row.id)" />
                            <q-btn color="negative" label="Изменить" :disable="loading" @click="onShowEdit()" />
                        </div>
                    </q-td>
                    <q-dialog v-model="showEdit" :transition-show="'jump-down'" :transition-hide="'jump-up'">
                        <edit-product :product="props.row" @product-edited="onProductEdited()"/>
                    </q-dialog>
                </q-tr>
            </template>
        </q-table>

        <q-dialog v-model="showCreate" :transition-show="'jump-down'" :transition-hide="'jump-up'">
            <create-product @product-created="onProductCreated()" />
        </q-dialog>
    </section>
    
</template>


<script setup lang="ts">

import { defineAsyncComponent, onMounted, Ref, ref } from "@vue/runtime-core"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { IProduct } from "../../store/modules/products/product.interface"

const CreateProduct = defineAsyncComponent(async () => import("../../components/admin/CreateProduct.vue"))
const EditProduct = defineAsyncComponent(async () => import("../../components/admin/EditProduct.vue"))

const router = useRouter()
const quasar = useQuasar()
const store = useStore()

const columns: any[] = [
  { name: "id", align: "center", label: "ID", field: "id" },
  { name: "title", align: "center", label: "Заголовок", field: "title" },
  { name: "description", align: "center", label: "Описание", field: "description" },
  { name: "type", align: "center", label: "Тип товара", field: "type" },
  { name: "image", align: "center", label: "Изображение", field: "image" },
  { name: "removeBtn", align: "center", label: "Действия", field: "type" },
]

const products: Ref<IProduct[]> = ref<IProduct[]>([])
const loading: Ref<boolean> = ref<boolean>(false)

const showCreate: Ref<boolean> = ref<boolean>(false)
const showEdit: Ref<boolean> = ref<boolean>(false)

const onShowCreate = async () => {
    showCreate.value = true
}
const onShowEdit = async () => {
    showEdit.value = true
}

const onRemove = async (id: number) => {
    loading.value = true
    products.value = await store.dispatch("removeOneProduct", id)
    loading.value = false
}

const onProductCreated = async () => {
    showCreate.value = false
    loading.value = true
    products.value = await store.dispatch("getProducts")
    loading.value = false
}

const onProductEdited = async () => {
    showEdit.value = false
    loading.value = true
    products.value = await store.dispatch("getProducts")
    loading.value = false
}

onMounted(async () => {
    loading.value = true
    products.value = await store.dispatch("getProducts")
    loading.value = false
})

</script>


<style lang="sass" scoped>

.table
    font-family: SpectralRegular

button
    font-family: Colus

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

p
    width: 300px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.actionsContainer
    width: 100%
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    align-content: center
    justify-content: center
    align-items: center
    gap: 10px
</style>