<template>
    <section class="page-section">
        <card-filter @filter-accepted="onAcceptedFilter($event)" />
        <q-inner-loading :showing="loading" dark style="z-index: 1000" />
        <q-pagination
            v-model="page"
            :max="cards.count"
            direction-links
            color="secondary"
            active-color="primary"
            @update:model-value="onGetCards()"
            style="margin-block: 10px"
        />
        <section class="cards-section">
            <card v-for="(card, index) in cards.result" :key="index" :card="card" />
        </section>
    </section>
</template>

<script lang="ts" setup>

import { ref, Ref } from "@vue/reactivity"
import { defineAsyncComponent, onMounted } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { IFilter } from "../store/modules/cards/card-filter.interface"
import { ICard } from "../store/modules/cards/card-object.interface"

const router = useRouter()

const card = defineAsyncComponent(async () => import("../components/Card.vue"))
const cardFilter = defineAsyncComponent(async () => import("../components/CardFilter.vue"))

const store = useStore()

const loading: Ref<boolean> = ref(false)

const queryData: any = router.currentRoute.value.query.page || 1
const page: Ref<number> = ref<any>(queryData)

const cards: Ref<{ result: ICard[], count: number }> = ref<{ result: ICard[], count: number }>({ result: [], count: 0})

const onGetCards = async (filter?: IFilter | any) => {
    loading.value = true
    let query = {
        ...{ page: page.value },
        ...filter || {}
    }
    await router.replace({ name: "cards", query: query })
    cards.value = await store.dispatch("getCards", { page: page.value - 1, filter: filter })
    loading.value = false
}

const onAcceptedFilter = async (filter: IFilter) => {
    await onGetCards(filter)
}

onMounted(async () => {
    onGetCards()
})
</script>

<style scoped lang="scss">

.page-section {
    display: flex;
    justify-content: flex-start;
    padding-block: 0px;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    gap: 0px;
    align-items: center;
    
}
.cards-section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    padding-block: 10px;
    gap: 20px;
}
</style>