<template>
    <q-carousel style="height: 100%;"
        swipeable
        dark
        animated
        :transition-duration="800"
        v-model="slide"
        navigation
        infinite
        arrows
        :autoplay="7000"
        :transition-next="'slide-left'"
        :transition-prev="'slide-right'"
        >
        
        <q-carousel-slide style="padding: 0" :name="1">
            <q-img no-native-menu  loading="eager" src="@/assets/images/ascent.png" fit="cover" key="cover" style="height:100%" position="50% 25%">
                <div class="absolute-full carousel-content ">
                    <h3>ВОСХОЖДЕНИЕ</h3>
                    <span>Нанимайте могущественные отряды, проводите древние ритуалы, воссоздавайте реликвии прошлого! Победа на поле боя будет за вами.</span>
                </div>
            </q-img>
        </q-carousel-slide>
        <q-carousel-slide style="padding: 0;" :name="2">
            <q-img no-native-menu  loading="eager" src="@/assets/images/dust.png" fit="cover" key="cover" style="height:100%" position="50% 25%">
                <div class="absolute-full carousel-content ">
                    <h3>ИМЯ ПЫЛИ</h3>
                    <span>Роман о судьбах оскорбленных богов, коварных лжецов и беспомощных смертных.</span>
                </div>
            </q-img>
        </q-carousel-slide>
        <q-carousel-slide style="padding: 0;" :name="3">
            <q-img no-native-menu  loading="eager" src="@/assets/images/dragons.png" fit="cover" key="cover" style="height:100%" position="50% 25%" contenteditable="false">
                <div class="absolute-full carousel-content ">
                    <h3>ДОЛИНА ДРАКОНОВ</h3>
                    <span>Возглавьте одну из восьми могущественных фракций и сразитесь за сокровища неизведанных земель!</span>
                </div>
            </q-img>
        </q-carousel-slide>
    </q-carousel>
</template>

<script setup lang="ts">

import { ref } from "vue"

const slide = ref(1)

</script>

<style scoped>
    .carousel-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        justify-content: center;
        flex-wrap: nowrap;
        user-select: none;
    }

    span {
        text-shadow: 0px 0px 20px black;
        font-size: 20px;
        width: 50%;
        text-align: center;
        font-family: SpectralRegular;
    }

    h3 {
        text-shadow: 0px 0px 20px black;
        font-family: Colus;
        margin: 10px;
    }
</style>