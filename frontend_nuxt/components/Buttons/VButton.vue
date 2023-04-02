<template>
    <button class="button" v-ripple>{{ label }}</button>
</template>

<script lang="ts" setup>
import { PropType } from "nuxt/dist/app/compat/capi"


const props = defineProps({
    label: {
        type: String as PropType<string>,
        required: true
    }
})

</script>

<style lang="scss" scoped>
.button {
    background-color: $primary;
    border: 0px solid;
    
}
</style>