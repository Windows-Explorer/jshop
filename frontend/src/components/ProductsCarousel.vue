<template>
    <div>
        <q-carousel
            v-if="!loading"
            animated
            :transition-duration="800"
            v-model="slide"
            arrows
            infinite
            swipeable
            control-color="dark"
            transition-next="slide-left"
            transition-prev="slide-right"
            class="carousel"
        >
            <q-carousel-slide v-for="(slide, slideIndex) in productsSlides" :key="slideIndex" :name="slideIndex">
                <div class="slide">
                    <q-img
                        v-for="(product, productIndex) in slide" :key="productIndex"
                        loading="lazy"
                        :src="product.image"
                        fit="cover" position="50% 25%" class="image"
                    >
                        <div class="absolute-bottom slide-inner">
                            <q-btn label="Подробнее" color="accent" text-color="dark" />
                        </div>
                        <template v-slot:error>
                            <div class="absolute-full flex flex-center text-white">
                                Не удалось загрузить изображение
                            </div>
                        </template>
                    </q-img>
                </div>
            </q-carousel-slide>
        </q-carousel>
        <q-carousel
            v-if="loading"
            v-model="slide"
            class="carousel"
        >
            <q-carousel-slide :name="0">
                <div class="slide">
                    <q-skeleton class="skeleton" type="rect" v-for="index in [...Array(3).keys()]" :key="index" />
                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
    
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue"
import { useStore } from "vuex"
import { IProduct } from "../common/interfaces/product.interface"

const store = useStore()

const slide: Ref<number> = ref(0)
const productsSlides: Ref<IProduct[][]> = ref([])
const loading: Ref<boolean> = ref(true)

const sortSlides = async (products: IProduct[]): Promise<IProduct[][]> => {
    if(products.length > 3) {
        let slides: IProduct[][] = []
        let internalTempArray: IProduct[] = []

        products.forEach(el => {
            internalTempArray.push(el)
            if(internalTempArray.length == 3) {
                slides.push(internalTempArray)

                internalTempArray = []
            }
        })
        return slides
    }
    return [products]
}

onMounted(async () => {
    loading.value = true
    productsSlides.value = await sortSlides(await store.dispatch("getProducts", { page: null, filter: null }))
    loading.value = false
})
</script>

<style scoped lang="scss">
    .skeleton {
        margin: 0px;
        width: 33%;
        height: 200px;
    }

</style>