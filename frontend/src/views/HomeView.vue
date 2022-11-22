<template>
    <signUpForm/>
</template>

<script setup lang="ts">

import { defineAsyncComponent } from "@vue/runtime-core"

const signUpForm = defineAsyncComponent(() => import("../components/SignUpForm.vue"))

</script>
