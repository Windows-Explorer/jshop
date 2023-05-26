<template>
  <div>
    <VHeaderMobile v-if="baseScreenWidth < 770" />
    <VHeader v-else />
    <VStickyHeaderMobile v-if="baseScreenWidth < 770" />
    <VStickyHeader v-else />
    <NuxtPage />
  </div>
</template>


<script lang="ts" setup>
import { WritableComputedRef, computed } from "vue"

const nuxtApp = useNuxtApp()
const baseScreenWidth: WritableComputedRef<number> = computed(() => nuxtApp.$display.getWidth())

</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.0s;
}

// .page-enter-from,
// .page-leave-to {}

.redirect-a {
  color: $dark;
  font-family: 'Nunito', serif;
  font-size: smaller;
}
</style>