<template>
    <section class="page-section">
        <signUpForm/>
    </section>
</template>


<script setup lang="ts">

import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const signUpForm = defineAsyncComponent(async () => import("../../components/auth/SignUpForm.vue"))


</script>

<style lang="scss" scoped>
.page-section {
    justify-content: center;
    align-items: center;
}
</style>