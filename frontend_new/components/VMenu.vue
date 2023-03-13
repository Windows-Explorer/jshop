<template>
    <div v-parent-position class="menu-container">
        <div class="menu" :style="{ top, left, width }">

        </div>
    </div>
</template>

<script lang="ts" setup>

const top: Ref<number> = ref(0)
const left: Ref<number> = ref(0)
const width: Ref<number> = ref(0)


onMounted(async () => {

})

</script>

<style lang="scss" scoped>
.menu-container {

}
.menu {
    position: fixed;
    width: 300px;
    height: 500px;
    background-color: red;
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0px 0px 20px black;
}
</style>