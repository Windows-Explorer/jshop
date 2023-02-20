<template>
    <q-card class="product">
        <div>
            <q-img height="200px" width="200px" :src="props.product.image" fit="cover" class="image" >
                <template v-slot:error>
                    <div class="absolute-full flex flex-center text-white">
                        Не удалось загрузить изображение
                    </div>
                </template>
            </q-img>
        </div>
        
        <div class="info">
            <h3 @click="router.push({ name: 'product', params: { id: props.product.id }})">{{ props.product.title }}</h3>
            <div>
                <q-input
                    @update:model-value="$emit('updateCount', $event)"
                    type="number"
                    label="Количество"
                    filled
                    v-model="props.product.count"
                />
                <q-btn
                    label="Убрать"
                    @click="$emit('updateCount', $event), onRemove(props.product)"
                />
            </div>
            <span class="price">{{ props.product.cost }}<small> ₽</small></span>
            <span>Категория: {{ props.product.category?.name }}</span>
        </div>
    </q-card>
</template>

<script setup lang="ts">
import { PropType } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { IProduct } from "../common/interfaces/product.interface"
import { ICartObject } from "../common/interfaces/cart-object.interface"

const router = useRouter()
const store = useStore()

const props = defineProps({
    product: {
        type: Object as PropType<ICartObject>,
        required: true
    }
})
const emits = defineEmits<{
    (event: "updateCount", count: number ): void
}>()

const onRemove = async (product: IProduct) => {
    store.dispatch("removeFromCart", product)
}

</script>

<style lang="scss" scoped>

h3 {
    cursor: pointer;
}
.product {
    min-width: 300px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    padding: 16px;
    gap: 16px;
    justify-content: center;
    flex-wrap: nowrap;
}
.image {
    height: 200px;
    width: 200px;
    border-radius: 6px;
}
.info h3 {
    font-size: 21px;
    margin: 0px;
}
.info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
}
.info div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}
.price {
    font-size: 18px;
}
</style>