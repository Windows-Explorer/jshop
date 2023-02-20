<template>
    <q-card class="product-card">
        <div class="product-content">
            <div class="image">
                <q-img
                    width="400px"
                    :src="props.product.image"
                    fit="cover"
                    alt="https://s3.castbox.fm/4a/f7/6f/61e1484b31909065414ea4e75a.jpg"
                >
                    <template v-slot:error>
                        <div class="absolute-full flex flex-center text-white">
                            Не удалось загрузить изображение
                        </div>
                    </template>
                </q-img>
            </div>
            <div class="info">
                <div class="name">{{ props.product.title }}</div>
                <div class="description">{{ props.product.description }}</div>
                <div class="actions-block">
                    <q-btn
                        v-if="!inCart"
                        rounded
                        color="dark"
                        icon="shopping_cart"
                        :label="`${props.product.cost} ₽`"
                        @click="onCart(props.product)"
                        :loading="loading"
                    />
                    <q-btn
                        v-else-if="inCart"
                        rounded
                        color="dark"
                        icon="shopping_cart"
                        label="Перейти в корзину"
                        :to="{ name: 'cart' }"
                        :loading="loading"
                    />
                </div>
            </div>
        </div>
    </q-card>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, Ref } from "@vue/runtime-core"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { ICartObject } from "../common/interfaces/cart-object.interface"
import { IProduct } from "../common/interfaces/product.interface"

const router = useRouter()
const store = useStore()
const quasar = useQuasar()

const loading: Ref<boolean> = ref(false)

const props = defineProps({
    product: {
        type: Object as PropType<IProduct>,
        required: true
    }
})

const inCart: Ref<boolean> = ref(false)

const onCart = async (product: IProduct) => {
    const cartObject: ICartObject | any = {
        id: product.id,
        title: product.title,
        image: product.image,
        cost: product.cost,
        count: 1
    }

    await store.dispatch("pushIntoCart", cartObject)
    inCart.value = await isCarted(cartObject)
}

const isCarted = async (product: IProduct) => {
    const cart: ICartObject[] = await store.getters.cart
    const index = cart.map(el => el.id).indexOf(product.id)
    if(index !== -1) return true
    else return false
}

onMounted( async () => {
    inCart.value = await isCarted(props.product)
})

</script>

<style lang="scss" scoped>

.product-card {
    background-color: $accent;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    padding: 20px;
    width: auto;
}
.image {
    text-align: center;
    margin: 0 0 10px;
    display: table;
    width: 100%;
    position: relative;
}

.description {
    color: #9b9a99;
    margin: 0 40px 20px;
    text-align: center;
    height: 45px;
    overflow: hidden;
    position: relative;
}

.name {
    font-size: 17px;
    line-height: 1.5;
    overflow: hidden;
    position: relative;
    display: block;
    text-align: center;
    margin-bottom: 10px;
}

.actions-block {
    display: flex;
    justify-content: center;
}
</style>