<template>
  <div>
    <header>
      <VHeaderMobile v-if="baseScreenWidth < 770" />
      <VHeader v-else />
      <VStickyHeaderMobile v-if="baseScreenWidth < 770" />
      <VStickyHeader v-else />
      <VAdminLayout v-if="role === 'user'" />
    </header>
    <NuxtPage />
  </div>
</template>


<script lang="ts" setup>
import { WritableComputedRef, computed } from "vue"
import useAuthStore from "./store/auth.store"
import { storeToRefs } from "pinia"

const nuxtApp = useNuxtApp()
const authStore = useAuthStore()

const { role } = storeToRefs(authStore)

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

header {
  z-index: 4;
  width: 100%;
  position: absolute;
  top: 0;
}
</style>