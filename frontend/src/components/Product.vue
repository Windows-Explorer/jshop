<template>
    <div class="product">
        <div class="image">
            <q-img :height="'200px'" :width="'250px'" :src="props.product.image" :fit="'cover'"/>
        </div>
        <div class="info">
            <h3>{{ props.product.title }}</h3>
            <div>
                <span class="price">{{ props.product.cost }}<small>$</small></span>
                <q-btn square label="Подробнее" @click="onRedirect(props.product.id)" />
                <q-btn round color="primary" icon="shopping_cart"></q-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { IProduct } from "../store/modules/products/product.interface"

const router = useRouter()

const props = defineProps({
    product: {
        type: Object as PropType<IProduct>,
        required: true
    }
})

const onRedirect = async (id: number) => {
    router.push({ name: "product", params: { id: id }})
}

</script>

<style lang="sass" scoped>

.product
    background-color: $primary
    display: flex
    flex-direction: column
    align-items: center
    align-content: center
    padding: 10px
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
    justify-content: space-between

.price
    font-size: 18px
</style>