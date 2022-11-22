<template>
  <section>
    <div>
        {{ users }}
    </div>
  </section>
</template>

<script setup lang="ts">

import { computed, onMounted } from "@vue/runtime-core"
import { useStore } from "./store"
import { ActionTypes } from "./store/actions"


const store = useStore()

const loading = computed(() => store.state.loading)
const users = computed(() => store.state.users)

onMounted(() => store.dispatch(ActionTypes.GetUsers))

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
