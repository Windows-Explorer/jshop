<template>
    <div>
        {{ cart }}
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core"
import { useStore } from "vuex"

const store = useStore()

const cart = ref([])

onMounted(async () => {
    cart.value = store.getters.cart
})

</script>