<template>
    <section class="page-section">
        <q-inner-loading :showing="loading" dark style="z-index: 1000" />
        <q-pagination
            v-model="page"
            :max="cards.count"
            direction-links
            color="secondary"
            active-color="primary"
            @update:model-value="onGetCards()"
        />
        <section class="cards-section">
            <card v-for="(card, index) in cards.result" :key="index" :card="card" />
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ref, Ref } from "@vue/reactivity"
import { defineAsyncComponent, onMounted } from "@vue/runtime-core"
import { useStore } from "vuex"
import { ICard } from "../store/modules/cards/card-object.interface"

const card = defineAsyncComponent(async () => import("../components/Card.vue"))

const store = useStore()

const loading: Ref<boolean> = ref(false)
const page: Ref<number> = ref<number>(1)

const cards: Ref<{ result: ICard[], count: number }> = ref<{ result: ICard[], count: number }>({ result: [], count: 0})

const onGetCards = async () => {
    loading.value = true
    cards.value = await store.dispatch("getCards", page.value - 1)
    loading.value = false
}

onMounted(async () => {
    await onGetCards()
})
</script>

<style scoped lang="scss">

.page-section {
    display: flex;
    justify-content: flex-start;
    padding-block: 12px;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    gap: 20px;
    align-items: center;
    
}
.cards-section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    gap: 20px;
}
</style>