<template>
    <span>Only authed page</span>
</template>


<script setup lang="ts">

import { onMounted } from '@vue/runtime-core'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const quasar = useQuasar()
const store = useStore()

onMounted(async () => {
    quasar.loading.show()
    const result = await fetch("http://localhost:3000/", {
        headers: {
            "Authorization": await store.getters.getToken
        }
    })
    const message = await result.json()
    console.log(message)
    quasar.loading.hide()
    if(result.status === 200) {
        quasar.dialog({
            title: result.status+"",
            message: message.data
        })
    }
    else if(result.status === 403) {
        quasar.dialog({
            title: result.status+"",
            message: "message.data"
        })
    }
})


</script>
