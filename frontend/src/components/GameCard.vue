<template>
    <div class="card">
        <q-card-section>
            <div class="text-h6">{{ props.game.title }}</div>
        </q-card-section>
        <q-card-section>
            <q-img :height="'300px'" :src="'https://www.textures.com/736be980dc8791f53c18b23382330dbd.jpg'" />
        </q-card-section>
        
        <q-card-section>
            {{ props.game.description }}
        </q-card-section>
        <q-btn label="Подробнее" />
    </div>
</template>

<script setup lang="ts">


import { PropType } from "@vue/runtime-core";
import { IGame } from "../store/modules/games/game.interface";

const props = defineProps({
    game: {
        type: Object as PropType<IGame>,
        required: true
    }
})

</script>

<style lang="sass" scoped>

.card
    min-height: 510px
    padding: 8px
    margin: 10px
    background-color: white
    height: auto
    min-width: 360px
    max-width: 30%
    color: $primary
    display: flex
    flex-direction: column
    align-items: stretch
    justify-content: space-between

</style>