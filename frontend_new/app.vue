<template>
  <div>
    <VHeaderMobile v-if="screenWidth < 660" />
    <VHeader v-else />
    <NuxtPage />
  </div>
</template>


<script lang="ts" setup>
import { Ref, ref, onMounted, WritableComputedRef, computed } from "vue"

const screenWidth: Ref<number> = ref(0)

const baseScreenWidth: WritableComputedRef<number> = computed({
  get(): number {
    return window.innerWidth
  },
  set(value: number) {
    screenWidth.value = value
  }
})

async function windowResizeHandler() {
  baseScreenWidth.value = window.innerWidth
}

onMounted(async () => {
  window.addEventListener('resize', windowResizeHandler)
})

</script>