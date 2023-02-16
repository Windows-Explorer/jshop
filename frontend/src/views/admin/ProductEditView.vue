<template>
    <section class="page-section"> 
        <q-table
            :rows="products"
            :columns="columns"
            :rows-per-page-options="[]"
            row-key="name"
            :loading="loading"
            class="table"
        >
            <template v-slot:top>
                <q-btn icon="add" flat :disable="loading" :loading="loading" label="Добавить" @click="onShowCreate()" />
                <q-btn icon="update" flat :disable="loading" :loading="loading" label="Обновить" @click="getProducts()"/>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td class="table-item" key="id" :props="props">
                        <span>
                            {{ props.row.id }}
                        </span>
                    </q-td>
                    <q-td class="table-item" key="title" :props="props">
                        <span>
                            {{ props.row.title }}
                        </span>
                    </q-td>
                    <q-td class="table-item" key="description" :props="props">
                        <span>
                            {{ props.row.description }}
                        </span>
                    </q-td>
                    <q-td class="table-item" key="type" :props="props">
                        <span>
                            {{ props.row.type }}
                        </span>
                    </q-td>
                    <q-td class="table-item" key="image" :props="props">
                        <q-img :src="props.row.image" />
                    </q-td>
                    <q-td class="table-item" key="removeBtn" :props="props">
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
import { IProduct } from "../../common/interfaces/product.interface"

const CreateProduct = defineAsyncComponent(async () => import("../../components/admin/CreateProduct.vue"))
const EditProduct = defineAsyncComponent(async () => import("../../components/admin/EditProduct.vue"))

const router = useRouter()
const quasar = useQuasar()
const store = useStore()

const columns: any[] = [
  { name: "id", align: "center", label: "ID", field: "id" },
  { name: "title", align: "center", label: "Заголовок", field: "title" },
  { name: "description", align: "center", label: "Описание", field: "description" },
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

const getProducts = async () => {
    loading.value = true
    products.value = await store.dispatch("getProducts", { page: null, filter: null })
    loading.value = false
}

onMounted(async () => {
    getProducts()
})

</script>

<style lang="scss" scoped>
.table {
    width: 90%
}
.table-item {
    width: 100px;
}
.table-item span {
    white-space: pre-wrap;
}
.actionsContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.page-section {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    font-family: RobotoRegular;
}
</style>