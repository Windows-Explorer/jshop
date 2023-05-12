<template>
  <div>
    <VHeaderMobile v-if="baseScreenWidth < 770" />
    <VHeader v-else />
    <VStickyHeaderMobile v-if="baseScreenWidth < 770" />
    <VStickyHeader v-else />
    <button @click="openDialog()" style="margin-top: 100px;">Open Dialog</button>
    <button @click="closeDialog()" style="margin-top: 100px;">Close Dialog</button>
    <NuxtPage />
  </div>
</template>


<script lang="ts" setup>
import { WritableComputedRef, computed } from "vue"
import { DialogEmitter } from "./common/dialog-emitter"

const baseScreenWidth: WritableComputedRef<number> = computed(() => window.innerWidth)
const dialogEmitter = new DialogEmitter()

async function openDialog() {
  dialogEmitter.open()
}
async function closeDialog() {
  dialogEmitter.close()
}


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