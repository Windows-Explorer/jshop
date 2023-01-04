<template>
    <div class="product">
        <div class="image">
            <q-img :height="'200px'" :width="'200px'" :src="props.product.image" :fit="'cover'"/>
        </div>
        <div class="info">
            <h3 @click="toProduct(props.product.id)">{{ props.product.title }}</h3>
            <div>
                <q-input
                    @update:model-value="$emit('updateCount', $event)"
                    standout
                    dark
                    type="number"
                    v-model="props.product.count"
                />
                <q-btn label="remove" @click="$emit('updateCount', $event), onRemove(props.product)"/>
            </div>
            <span class="price">{{ props.product.cost }}<small> ₽</small></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ICartObject } from "../store/modules/cart/cart-object.interface"
import { onMounted, onUpdated, PropType, ref, Ref } from "@vue/runtime-core"
import { QBtn, QImg, QTooltip, useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { IProduct } from "../store/modules/products/product.interface"

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

const toProduct = async (id: number) => router.push({ name: "product", params: { id: id }})


</script>

<style lang="sass" scoped>

h3
    cursor: pointer
.product
    min-width: 300px
    width: 100%
    display: flex
    flex-direction: row
    align-items: center
    align-content: center
    padding: 16px
    gap: 16px
    justify-content: center
    flex-wrap: nowrap
.image
    margin-bottom: 0px

.info h3
    font-size: 21px
    margin: 0px

.info
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: flex-start
.info div
    display: flex
    flex-direction: row
    align-items: center
    gap: 10px

.price
    font-size: 18px

</style>