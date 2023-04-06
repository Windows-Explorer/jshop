<template>
  <div>
    <VHeaderMobile v-if="baseScreenWidth < 660" />
    <VHeader v-else />
    <VStickyHeaderMobile v-if="baseScreenWidth < 660" />
    <VStickyHeader v-else />
    <NuxtPage />
  </div>
</template>


<script lang="ts" setup>
import { WritableComputedRef, computed } from "vue"

const baseScreenWidth: WritableComputedRef<number> = computed(() => window.innerWidth)

</script>