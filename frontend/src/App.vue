<template>
  <section>
    <div>
      {{ token }}
    </div>
  </section>
</template>

<script setup lang="ts">

import { computed, onMounted } from "@vue/runtime-core"
import { useStore } from "vuex"

const store = useStore()

const token = computed(() => store.state.TokenStoreModule.tokenState)

onMounted(() => {
  store.dispatch("getTokenAction")
})

</script>

<style>

  html, body {
    margin: 0 auto;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  span{
    margin: 10px;
  }
</style>
