<template>
    <Teleport to="body">
        <Transition name="dialog">
            <div class="wrapper" v-if="props.show" @click="emits('dialogClosed')">
                <div class="dialog" @click.stop>
                    <h2>{{ props.title }}</h2>
                    <input type="text" v-model="product.title" placeholder="Заголовок">
                    <input type="text" v-model="product.description" placeholder="Описание">
                    <input type="number" v-model="product.cost" placeholder="Цена">
                    <input type="file" @change="fillImage($event)" placeholder="Изображение">
                    <VButton class="submit" label="Добавить" @click="onSubmit()" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { storeToRefs } from 'pinia';
import { IProduct } from '~/common/interfaces/data/product.interface'
import useCategoriesStore from '~/store/categories.store'
import useProductsStore from '~/store/products.store'

const emits = defineEmits(["dialogClosed"])

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    product: {
        type: Object as PropType<IProduct>,
        required: false,
        default: {
            id: undefined,
            name: "",
            description: ""
        }
    },
    title: {
        type: String,
        required: true
    }
})

const currentFile: Ref<File | null> = ref(null)
const product: Ref<IProduct> = ref({
    id: undefined,
    title: "",
    description: "",
    cost: 0,
    category: props.product.category
})

const { categories } = storeToRefs(useCategoriesStore())

async function fillInputs() {
    product.value = props.product
}

async function fillImage(event: Event) {
    const target = event.target as HTMLInputElement
    if (target && target.files) {
        currentFile.value = target.files[0]
    }
}

onMounted(async () => {
    fillInputs()
})

const productsStore = useProductsStore()

async function onSubmit() {
    await productsStore.saveProduct(product.value, currentFile.value!)
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