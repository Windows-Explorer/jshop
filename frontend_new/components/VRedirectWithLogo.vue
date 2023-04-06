<template>
    <div class="redirect-with-logo">
        <div class="redirect-icon">
            <slot></slot>
        </div>
        <div class="label-container">
            <span class="label">{{ props.label }}</span>
            <div class="line"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue"


const props = defineProps({
    label: {
        type: String as PropType<string>,
        required: true
    }
})

</script>

<style lang="scss" scoped>
.redirect-with-logo {
    font-family: "Nunito", serif;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    fill: $primary;
    gap: 8px;
    animation: 0.5s jump-down ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

.label-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px;
    cursor: pointer;
    align-items: center;

    .line {
        height: 2px;
        width: 0%;
        border-radius: 10px;
        background-color: $primary;
        transition: 0.5s ease;
    }

    .label {
        color: $primary;
    }
}

.label-container:hover {
    .line {
        width: 100%;
    }
}

.redirect-icon {
    width: 32px;
    height: 32px;
    box-shadow: 0px 0px 0px 2px $primary;
    border-radius: 50%;
    padding: 6px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
}
</style>