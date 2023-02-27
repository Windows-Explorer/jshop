<template>
    <section>
        <q-tabs :dense="false" :align="'left'">
            <h6>Admin layout</h6>
            <q-route-tab to="/admin/edit/products" label="Редактирование товаров" />
            <q-route-tab to="/admin/image" label="Загрузка изображений" />
            <q-route-tab @click="store.dispatch('parseXML')" label="Парсинг XML " />
        </q-tabs>
    </section>
</template>

<script lang="ts" setup>
import { useStore } from "vuex"

const store = useStore()
</script>

<style scoped>
h6 {
    font-size: medium;
    margin-block: 0px;
    margin-inline: 20px
}

section {
    font-family: Colus;
}

</style>