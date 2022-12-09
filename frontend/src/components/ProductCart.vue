<template>
    <div class="product">
        <div class="image">
            <q-img :height="'200px'" :width="'200px'" :src="props.product.image" :fit="'cover'"/>
        </div>
        <div class="info">
            <h3 @click="toProduct(props.product.id)">{{ props.product.title }}</h3>
            <div>
                <q-btn round color="primary" icon="arrow_left" @click="(props.product.count -= 1)"/>
                <q-input
                    @update:model-value="$emit('updateCount', $event)"
                    standout
                    dark
                    type="number"
                    v-model="props.product.count"
                />
                <q-btn round color="primary" icon="arrow_right" @click="(props.product.count += 1)"/>
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

const router = useRouter()
const store = useStore()

const props = defineProps({
    product: {
        type: Object as PropType<ICartObject>,
        required: true
    }
})

const onRemove = async () => {

}

const toProduct = async (id: number) => router.push({ name: "product", params: { id: id }})

const emits = defineEmits<{
    (event: "updateCount", count: number ): void
}>()

</script>

<style lang="sass" scoped>

h3
    cursor: pointer
.product
    min-width: 300px
    width: 40%
    background-color: $primary
    display: flex
    flex-direction: column
    align-items: center
    align-content: center
    padding: 16px
    gap: 16px
.image
    margin-bottom: 0px

.info h3
    font-size: 21px
    margin-bottom: 0px

.info
    width: 100%
.info div
    display: flex
    flex-direction: row
    align-items: center
    gap: 10px

.price
    font-size: 18px

</style>