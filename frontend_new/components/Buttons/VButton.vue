<template>
    <button v-ripple="'#fff'" class="button" :style="{ fontSize: props.size + 'px' }">{{ props.label }}</button>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'


const props = defineProps({
    label: {
        type: String as PropType<string>,
        required: true
    },
    size: {
        type: Number as PropType<number>,
        required: false,
        default: 20
    }
})

</script>

<style lang="scss" scoped>
.button {
    font-family: 'Nunito', serif;
    border: 0px solid;
    padding: 10px 30px;
    background-color: transparent;
    color: $primary;
    box-shadow: 0px 0px 0px 2px $primary;
    border-radius: 0px;
    transition: 0.5s ease;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}
</style>