<template>
  <q-layout>
    <header-layout />
    <q-page-container class="page-container" :style="myTweak">
        <router-view />
    </q-page-container>
  </q-layout>
  
</template>

<script lang="ts" setup>

import { defineAsyncComponent, onMounted } from '@vue/runtime-core'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const AdminLayout = defineAsyncComponent(async () => import("./components/admin/AdminLayout.vue"))
const HeaderLayout = defineAsyncComponent(async () => import("./components/HeaderLayout.vue"))

const store = useStore()
const router = useRouter()
const quasar = useQuasar()
const route = useRoute()

const myTweak = (offset: number) => { height: offset ? `calc(100vh - ${offset}px)` : '200vh' }


onMounted(async () => {
  quasar.loadingBar.setDefaults({
    color: "negative"
  })

  store.dispatch("getRoleFromJwt")
})


</script>