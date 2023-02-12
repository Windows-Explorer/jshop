<template>
    <div class="skeleton-container">
        <q-skeleton class="skeleton" type="text" v-for="index in [...Array(6).keys()]" :key="index" />
    </div>
</template>

<style scoped lang="scss">
.skeleton-container {
    display: flex;
    height: 90%;
    gap: 10px;
    .skeleton {
        margin: 0px;
        height: 100%;
        padding: 0px;
        width: 160px;
    }
}

</style>