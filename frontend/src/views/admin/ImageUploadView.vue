<template>
    <section class="page-section">
        <q-uploader
            url="http://localhost:3000/products/save/images"
            :headers="[{name: 'Authorization', value: token}]"
            label="Upload"
            multiple
            style="width: 600px; height: 500px"
        />
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


<style lang="sass" scoped>

section
    width: 100%
    height: 100%
    padding-top: 10px
    color: white
    display: flex
    flex-direction: row
    flex-wrap: wrap
    align-content: center
    justify-content: center
    align-items: flex-start
    gap: 10px


</style>