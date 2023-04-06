<template>
    <div class="timeline-container">
        <h4>{{ props.date }}</h4>
        <p>{{ props.text }}</p>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
const props = defineProps({
    date: {
        type: String as PropType<string>,
        required: true
    },
    text: {
        type: String as PropType<string>,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.timeline-container {
    width: 50%;
}

h4 {
    font-family: 'Roboto Slab', serif;
    font-size: large;
    color: $dark;
}

p {
    font-family: 'Nunito', serif;
    color: $dark;
}

@media screen and (max-width: 600px) {
    .timeline-container {
        width: 80%;
    }
}
</style>