<template>
  <section>
    <div>
      <span v-for="user in allUsers" :key="user">
        {{ user }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core"

  const allUsers = computed({
    get(): string[] {
      return ["123", "123421"]
    },
    set () {
      return "ass"
    }
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
