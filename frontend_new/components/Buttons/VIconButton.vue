<template>
    <transition name="vbutton">
        <button v-ripple="'#b8784e'" class="button" :style="{ height: props.size + 'px', width: props.size + 'px' }">
            <slot></slot>
        </button>
    </transition>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'


const props = defineProps({
    size: {
        type: Number as PropType<number>,
        required: false,
        default: 32
    }
})

</script>

<style lang="scss" scoped>
.button {
    font-family: 'Nunito', serif;
    border: 0px solid;
    padding: 10px;
    border-radius: 50%;
    background-color: $primary;
    transition: 0.5s ease;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.vbutton-leave-active,
.vbutton-enter-active {
    overflow: hidden;
    transition: 0.5s ease;
}

.vbutton-enter-to,
.vbutton-leave-from {
    transform: scale(3);
}
.vbutton-enter-from, .vbutton-leave-to {
    transform: scale(0);
}
</style>