<template>
    <section>
        <signUpForm/>
    </section>
</template>


<script setup lang="ts">

import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const signUpForm = defineAsyncComponent(async () => import("../../components/auth/SignUpForm.vue"))


</script>
