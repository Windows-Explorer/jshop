<template>
    <div>
        {{ productsSlides }}
        <q-carousel
        swipeable
        animated
        :transition-duration="800"
        v-model="slide"
        infinite
        arrows
        :transition-next="'slide-left'"
        :transition-prev="'slide-right'"
        height="auto"
        >
            <q-carousel-slide v-for="(slide, slideIndex) in productsSlides" :key="slideIndex" :name="slideIndex">
                <div class="slide">
                    <q-img
                        v-for="(product, productIndex) in slide" :key="productIndex"
                        loading="eager"
                        src="https://hobbygames.cdnvideo.ru/image/data/HobbyWorld/Dedukcio/Banners/Dedukcio_632x340.jpg"
                        fit="cover" position="50% 25%" class="image"
                    >
                    {{ product }}
                    </q-img>
                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, Ref, ref } from "vue"
import { IProduct } from "../common/interfaces/product.interface"
const slide = ref(1)

const props = defineProps({
    products: {
        type: Object as PropType<IProduct[]>,
        required: true
    }
})
const productsSlides: Ref<IProduct[][]> = ref([])

const sortSlides = async (oldArray: IProduct[]): Promise<IProduct[][]> => {
    if(oldArray.length > 3) {
        let newArray: IProduct[][] = []
        let internalTempArray: IProduct[] = []

        oldArray.forEach(el => {
            internalTempArray.push(el)
            if(internalTempArray.length == 3) {
                newArray.push(internalTempArray)

                internalTempArray = []
            }
        })

        return newArray
    }
    
    return [oldArray]
}

onMounted(async () => {
    productsSlides.value = await sortSlides(props.products)
})
</script>

<style scoped>
    .image {
        height: auto;
        width: 33%;
    }
    .slide {
        height: auto;
        width: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        gap: 16px;
    }
</style>