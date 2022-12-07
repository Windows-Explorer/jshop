<template>
    <section>
        <q-inner-loading :showing="loading" dark />
        <game-card :game="game" v-for="(game, index) in games" :key="index"/>
    </section>
</template>

<script setup lang="ts">
import { IGame } from "../store/modules/games/game.interface"
import { Ref, ref } from "@vue/reactivity"
import { defineAsyncComponent, onMounted } from "@vue/runtime-core"
import { useStore } from "vuex"

const store = useStore()

const GameCard = defineAsyncComponent(async () => import("../components/GameCard.vue"))

const games: Ref<IGame[]> = ref<IGame[]>([])
const loading: Ref<boolean> = ref(false)

const getContent = async () => {
    loading.value = true
    games.value = await store.dispatch("getGames")
    loading.value = false
}

onMounted(async () => getContent())

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