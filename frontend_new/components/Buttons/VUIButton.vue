<template>
    <div class="ui-button tab">
        <slot name="icon"></slot>
        <span>{{ props.label || "" }}</span>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    label: {
        type: String as PropType<string>,
        required: false
    }
})
</script>

<style lang="scss">
.ui-button {
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    border: 0px;
    gap: 6px;

    svg {
        fill: $primary;
    }
}

.ui-button:focus {
    border: 0;
    outline: none;
}
</style>