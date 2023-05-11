<template>
    <div>
        account page
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: "auth-guard"
})
</script>