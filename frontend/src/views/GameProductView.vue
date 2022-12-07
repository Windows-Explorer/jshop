<template>
    <section>
        <q-inner-loading :showing="loading" dark/>
        {{ game }}
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "@vue/runtime-core"
import { useRouter } from "vue-router"

const router = useRouter()

const loading: Ref<boolean> = ref(false)

const game: Ref<any> = ref()

const getContent = async () => {
    loading.value = true
    game.value = await (await fetch(`http://95.163.243.175:3000/products/games/${router.currentRoute.value.params.id}`)).json()
    loading.value = false
}

onMounted(async () => getContent() )

</script>

<style scoped>
    section {
        width: 100%;
        color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        align-items: flex-start;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>