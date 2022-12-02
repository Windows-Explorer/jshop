<template>
    <section>
        Only authed page
    </section>
</template>


<script setup lang="ts">

import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const data = { token: ""}


</script>
