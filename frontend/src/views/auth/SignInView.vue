<template>
    <section class="page-section">
        <signInForm/>
    </section>
</template>


<script setup lang="ts">

import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const signInForm = defineAsyncComponent(async () => import("../../components/auth/SignInForm.vue"))


</script>

<style lang="scss" scoped>
.page-section {
    justify-content: center;
    align-items: center;
}
</style>