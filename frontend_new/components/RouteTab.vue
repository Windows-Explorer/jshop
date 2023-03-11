<template>
    <div class="route-tab-container">
        <router-link v-ripple :to="{}" active-class="tab-active" class="tab">
            {{ props.label }}
        </router-link>
        
    </div>
</template>


<script lang="ts" setup>

import { PropType } from 'vue'
import { RouteLocationRaw } from "vue-router"

const props = defineProps({
    label: {
        type: String as PropType<string>,
        required: true
    },
    to: {
        type: Object as PropType<RouteLocationRaw>,
        required: true
    }
})


</script>

<style lang="scss" scoped>
.tab {
    width: 100px;
    padding: 10px 30px;
    background-color: black;
    color: white;
    user-select: none;
    font-family: 'Nunito', sans-serif ;
    text-transform: uppercase;
}

a{
    text-decoration: none;
}

</style>