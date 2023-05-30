<template>
    <div class="user-page-container">
        <VUserSignInForm />
        <VFooter />
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: "account-guard"
})
</script>
<style lang="scss" scoped>
.user-page-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-content: center;
    flex-wrap: nowrap;
    background-color: $primary;
}
</style>