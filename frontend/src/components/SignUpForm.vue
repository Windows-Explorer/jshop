<template>
    <div>
        <input type="text">
        <input type="text">
        <input type="text">
        <input type="text">
        <input type="text">
        {{ test }}
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "@vue/reactivity"


const test: Ref<string> = ref("asr")

</script>
