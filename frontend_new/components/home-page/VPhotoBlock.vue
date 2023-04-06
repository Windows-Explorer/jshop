<template>
    <div class="v-img"
        :style="`background-image: url('${props.image}'); height: ${props.sizes.height}; width: ${props.sizes.width};`">
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue"

const props = defineProps({
    image: {
        type: String as PropType<string>,
        required: true
    },
    sizes: {
        type: Object as PropType<{ height: string, width?: string }>,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.v-img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
}

@media screen and (max-width: 700) {
    .v-img {
        width: 100%;
    }
}
</style>