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

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.0s;
}

.page-enter-from,
.page-leave-to {
  
}
</style>