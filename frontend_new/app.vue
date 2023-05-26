<template>
  <div>
    <VHeaderMobile v-if="baseScreenWidth < 770" />
    <VHeader v-else />
    <VStickyHeaderMobile v-if="baseScreenWidth < 770" />
    <VStickyHeader v-else />
    <!-- <button @click="openDialog()" style="margin-top: 200px;">Open Dialog</button>
    <button @click="closeDialog()" style="margin-top: 200px;">Close Dialog</button> -->
    <NuxtPage />
  </div>
</template>


<script lang="ts" setup>
import { WritableComputedRef, computed } from "vue"


const baseScreenWidth: WritableComputedRef<number> = computed(() => 900)

// const popupEmitter = usePopup()
// const popup = popupEmitter.createPopup({
//   title: "Title"
// })

// async function openDialog() {
//   (await popup).value.open()
// }
// async function closeDialog() {
//   (await popup).value.close()
// }


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