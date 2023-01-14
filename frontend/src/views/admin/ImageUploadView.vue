<template>
    <section class="page-section">
        <q-uploader class="uploader"
            url="http://31.31.201.48:3000/products/save/images"
            :headers="[{ name: 'Authorization', value: token }]"
            label="Загрузить изображение"
            multiple
        />

        <q-list class="list"
            separator
        >
            <q-item clickable v-ripple>
                <q-item-section v-for="(file, index) in files" :key="index" />
            </q-item>
        </q-list>
    </section>
    
</template>


<script setup lang="ts">

import { defineAsyncComponent, onMounted, Ref, ref } from "@vue/runtime-core"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const router = useRouter()
const quasar = useQuasar()
const store = useStore()

const token: Ref<string> = ref<string>("")

onMounted(async () => {
    token.value = await store.getters.token
})

</script>

<style lang="scss" scoped>
section {
    display: flex;
    height: 100%;
    padding: 12px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 12px
}

.uploader {
    width: 50%;
    min-height: 100%;
}

.list {
    min-height: 100%; width: 50%;
}
</style>