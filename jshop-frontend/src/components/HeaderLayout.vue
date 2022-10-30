<template>
    <nav>
        <h2>{{ title }}</h2>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { store } from '../main';

    export default defineComponent({
        name: "HeaderLayout",
        data: () => {
            return {
                title: store.state.title
            }
        }
    })

</script>