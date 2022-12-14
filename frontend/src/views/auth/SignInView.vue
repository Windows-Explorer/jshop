<template>
    <section>
        <signInForm/>
    </section>
</template>


<script setup lang="ts">

import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const signInForm = defineAsyncComponent(async () => import("../../components/auth/SignInForm.vue"))


</script>
