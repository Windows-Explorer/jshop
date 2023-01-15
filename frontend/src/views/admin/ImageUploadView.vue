<template>
    <section class="page-section">
        <q-uploader class="uploader"
            url="http://31.31.201.48:3000/files"
            :headers="[{ name: 'Authorization', value: token }]"
            label="Загрузить изображение"
            multiple
            @uploaded="getFiles()"
        />

        <q-list class="list" separator>
            <q-item clickable v-ripple>
                <q-item-section class="item-section" v-for="(file, index) in files" :key="index">
                    {{ file }}
                    <q-btn
                        label="Удалить"
                        color="negative"
                        @click="onRemoveFile(file)"
                    />
                </q-item-section>
            </q-item>
        </q-list>
    </section>
    
</template>


<script setup lang="ts">

import { onMounted, Ref, ref } from "@vue/runtime-core"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const router = useRouter()
const quasar = useQuasar()
const store = useStore()

const token: Ref<string> = ref<string>("")
const files: Ref<string[]> = ref<string[]>([])

const onRemoveFile = async (filename: string) => {
    files.value = await store.dispatch("removeFile", filename)
}

const getFiles = async () => {
    files.value = await store.dispatch("getFiles")
}

onMounted(async () => {
    token.value = await store.getters.token
    getFiles()
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
    width: 50%;
    min-height: 100%;
    background-color: $primary;
    color: $secondary;
}

.item-section {
    display: flex;
}

</style>