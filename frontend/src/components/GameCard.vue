<template>
    <div class="card">
        <q-card-section>
            <h5>{{ props.game.title }}</h5>
        </q-card-section>
        <q-card-section>
            <q-parallax :src="props.game.image" :speed="0.5" :height="300">
            </q-parallax>
            
        </q-card-section>
        
        <q-card-section>
            <p>
                {{ props.game.description }}
            </p>
           
        </q-card-section>
        <q-btn :style="'font-family: Colus'" label="Подробнее" @click="onRedirect(props.game.id)"/>
    </div>
</template>

<script setup lang="ts">
import { PropType } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { IGame } from "../store/modules/games/game.interface"

const router = useRouter()

const props = defineProps({
    game: {
        type: Object as PropType<IGame>,
        required: true
    }
})

const onRedirect = async (id: number) => {
    router.push({ name: "game", params: { id: id }})
}

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

p
    margin: 0px
    font-size: 20px
    font-family: SpectralRegular

h5
    font-family: Colus
    margin: 0px
    width: 100%
    text-align: left
</style>