<template>
    <section>
        <signUpForm/>
        <signUpFormVuetify/>
    </section>
</template>

<script setup lang="ts">

import { defineAsyncComponent } from "@vue/runtime-core"

const signUpForm = defineAsyncComponent(async () => import("../components/SignUpForm.vue"))
const signUpFormVuetify = defineAsyncComponent(async () => import("../components/SignUpFormQuasar.vue"))

</script>

<style scoped>
    section {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-evenly;
        align-items: center;
    }
</style>