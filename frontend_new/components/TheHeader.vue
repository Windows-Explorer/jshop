<template>
    <div class="header-container">
        <div class="header">
            <RouteTab :to="{ name: 'index' }" label="Ripple" />
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>

.header-container {
    width: 90vw;
    height: 100vh;
}

.header {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>