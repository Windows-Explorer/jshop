<template>
    <div class="filter-section">
        <q-select
            v-model="filter.color"
            :options="colors"
            label="Цвет карты"
            filled
            style="width: 160px"
            :loading="loading"
            clearable clear-icon="close"
        />
        <q-select
            v-model="filter.type"
            :options="cardTypes"
            label="Тип карты"
            filled
            style="width: 160px"
            :loading="loading"
            clearable clear-icon="close"
        />
        <q-input
            v-model="filter.name"
            type="text"
            filled label="Название"
            clearable clear-icon="close"
        />
        <q-input
            v-model="filter.manacost"
            type="number"
            filled
            label="Стоимость"
            clearable clear-icon="close"
        />
        <q-input
            v-model="filter.pt"
            type="number"
            filled
            label="Сила"
            clearable clear-icon="close"
        />
        <q-btn @click="onAcceptFilter()" color="positive" label="Применить" />
        <q-btn @click="onResetFilter()" color="negative" label="Сбросить" />
    </div>
</template>

<script lang="ts" setup>

import { ref, Ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { QSelect, QInput, QBtn } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { IFilter } from '../store/modules/cards/card-filter.interface'
import { ICardType } from '../store/modules/cards/card-type-object.interface'
import { IColor } from '../store/modules/cards/color-object.interface'

const store = useStore()
const router = useRouter()

const loading: Ref<boolean> = ref(false)

const cardTypes: Ref<string[]> = ref([])
const colors: Ref<string[]> = ref([])

const filter = ref<any>({
    name: ref(null),
    color: ref(null),
    type: ref(null),
    manacost: ref(null),
    pt: ref(null),
})

const emits = defineEmits<{
    (event: "filterAccepted", filter: IFilter): void
}>()

const onGetColors = async () => {
    const result: IColor[] = await store.dispatch("getColors")
    colors.value = result.map(color => color.name)
}
const onGetCardTypes = async () => {
    const result: ICardType[] = await store.dispatch("getCardTypes")
    cardTypes.value = result.map(cardType => cardType.name)
}

const onResetFilter = async () => {
    Object.keys(filter.value).forEach(key => filter.value[key] = null)
    emits("filterAccepted", filter.value)
}
const onAcceptFilter = async () => {
    emits("filterAccepted", filter.value)
}

onMounted(async () => {
    onAcceptFilter()
    onGetColors()
    onGetCardTypes()
})

</script>

<style lang="scss" scoped>
.filter-section {
    font-family: SpectralRegular;
    display: flex;
    width: 100%;
    height: auto;
    background-color: $dark;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-start;
    gap: 12px;
    padding: 8px;
}
button {
    font-family: Colus;
}
</style>