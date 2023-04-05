<template>
    <NuxtLink :to="props.to" active-class="tab-active" class="tab">
        <slot class="icon" name="icon">
        </slot>
        <div class="label-container">
            <span class="label">
                {{ props.label }}
            </span>
            <span class="line"></span>
        </div>
    </NuxtLink>
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

<style lang="scss">
.tab:hover>svg {
    animation: pulsation 0.5s ease infinite;
}

.tab:focus {
    outline: none;
}

.tab {
    flex-grow: 0;
    width: auto;
    padding: 8px;
    user-select: none;
    font-family: 'Nunito', serif;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
    transition: 0.5s ease;
    border-radius: 50px;

    svg {
        display: none;
        fill: $primary;
        transition: 0.5s ease-in-out;
        padding-block: 2px;
    }

    .label-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        flex-wrap: wrap;
        transition: 0.5s ease-in-out;
        height: 100%;
        width: 100%;
        padding-block: 2px;

        .label {
            white-space: nowrap;
            color: $primary;
            transition: 0.5s cubic-bezier(0.6, 0.1, 0, 1.5);
            transition-delay: 0.3s;
            text-align: center;
        }

        .line {
            background-color: $primary;
            width: 0%;
            height: 2px;
            border-radius: 10px;
            transition: 0.5s ease;
        }
    }
}

.tab-active {
    .label-container {
        .line {
            width: 100%;
        }
    }
}

a {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}
</style>