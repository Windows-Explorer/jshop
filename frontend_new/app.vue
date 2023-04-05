<template>
  <div>
    <VHeaderMobile v-if="baseScreenWidth < 660" />
    <VHeader v-else />
    <VStickyHeader />
    <NuxtPage />
  </div>
</template>


<script lang="ts" setup>
import { WritableComputedRef, computed } from "vue"

const baseScreenWidth: WritableComputedRef<number> = computed(() => window.innerWidth)

</script>