<template>
    <q-carousel
        swipeable
        dark
        animated
        :transition-duration="800"
        v-model="slide"
        navigation
        infinite
        arrows
        :autoplay="false"
        :transition-next="'slide-left'"
        :transition-prev="'slide-right'"
        >
        
        <q-carousel-slide style="padding: 0;" :name="1">
            <q-img no-native-menu no-spinner loading="eager" src="http://localhost:8080/images/ascent.png" fit="cover" key="cover" style="height:100%" position="50% 25%">
                <div class="absolute-full carousel-content ">
                    <h3>ВОСХОЖДЕНИЕ</h3>
                    <span>Нанимайте могущественные отряды, проводите древние ритуалы, воссоздавайте реликвии прошлого! Победа на поле боя будет за вами.</span>
                </div>
            </q-img>
        </q-carousel-slide>
        <q-carousel-slide style="padding: 0;" :name="2">
            <q-img no-native-menu no-spinner loading="eager" src="http://localhost:8080/images/dust.png" fit="cover" key="cover" style="height:100%" position="50% 25%">
                <div class="absolute-full carousel-content ">
                    <h3>ИМЯ ПЫЛИ</h3>
                    <span>Роман о судьбах оскорбленных богов, коварных лжецов и беспомощных смертных.</span>
                </div>
            </q-img>
        </q-carousel-slide>
        <q-carousel-slide style="padding: 0;" :name="3">
            <q-img no-native-menu no-spinner loading="eager" src="http://localhost:8080/images/dragons.png" fit="cover" key="cover" style="height:100%" position="50% 25%" contenteditable="false">
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
        font-size: 20px;
        width: 50%;
        text-align: center;
    }

    h3 {
        margin: 10px;
    }
</style>