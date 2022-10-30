<template>
  <HeaderLayout />
</template>

<script>

  import HeaderLayout from "@/components/HeaderLayout.vue"

  export default {
    data: () => {
      return {
        test: "test"
      }
    },
    components: { HeaderLayout }
  }

</script>

<style>
  html, body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
