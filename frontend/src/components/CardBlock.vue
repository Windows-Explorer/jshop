<template>
    <div class="card">
        <q-img class="img" :src="$props.card.image" height="100%" width="100%" />
    </div>
</template>

<script lang="ts" setup>
import { ICard } from "../store/modules/cards/card-object.interface"

const props = defineProps<{
    card: ICard 
}>()

</script>

<style lang="scss" scoped>

.card {
    height: 400px;
    width: 300px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}

.card .img {
    border-radius: 20px;
}

</style>