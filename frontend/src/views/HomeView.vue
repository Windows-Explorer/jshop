<template>
    <section>
        <signUpForm/>
    </section>
</template>

<script setup lang="ts">

import { defineAsyncComponent } from "@vue/runtime-core"

const signUpForm = defineAsyncComponent(() => import("../components/SignUpForm.vue"))

</script>

<style scoped>
    section {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
    }
</style>