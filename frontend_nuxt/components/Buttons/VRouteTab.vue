<template>
    <NuxtLink class="route-tab">
        {{ props.label }}
    </NuxtLink>
</template>

<script lang="ts" setup>
import { PropType } from "nuxt/dist/app/compat/capi";


const props = defineProps({
    label: {
        type: String as PropType<string>,
        required: true
    }
})

</script>

