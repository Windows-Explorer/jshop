<template>
    <div class="ad-block">
        <slot></slot>
        <div class="ad-content">
            <h2>{{ props.label }}</h2>
            <p>{{ props.description }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "nuxt/dist/app/compat/capi"


const props = defineProps({
    label: {
        type: String as PropType<string>,
        required: true
    },
    description: {
        type: String as PropType<string>,
        required: true
    }
})

</script>

<style lang="scss">
.ad-block {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 25%;
    padding-block: 30px;
    background-color: #fff;
    box-shadow: 0px 0px 0px 1px $secondary inset;
    transition: 0.5s ease;

    svg {
        height: 50px;
        width: 50px;
        margin: 20px;
    }

    .ad-content {
        padding: 20px;

        h2 {
            font-family: 'Roboto Slab', serif;
            color: $accent;
            margin: 4px;
        }

        p {
            font-family: 'Nunito', serif;
        }
    }
}

.ad-block:hover {
    box-shadow: 0px 0px 0px 3px $accent inset;
}

@media screen and (max-width: 800px) {
    .ad-block {
        width: 50%;
    }
}

@media screen and (max-width: 550px) {
    .ad-block {
        width: 100%;
    }
}
</style>