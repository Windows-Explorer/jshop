<template>
  <q-layout view="hhh Lpr fFf">

  <q-header :reveal="true" :elevated="true">

    <q-tabs :align="'left'">
      <q-route-tab to="/" label="Home" />
      <q-route-tab v-if="!store.getters.isAuthorized" to="signup" label="SignUp" />
      <q-route-tab v-if="!store.getters.isAuthorized" to="signin" label="SignIn" />
      <q-route-tab v-if="store.getters.isAuthorized" @click="onLogout()" label="Logout"/>
    </q-tabs>

  </q-header>

  <q-page-container :align="'center'">
    <router-view />
  </q-page-container>

  </q-layout>
  
</template>

<script lang="ts" setup>

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const quasar = useQuasar()

const onLogout = async () => {
  quasar.loading.show()
  await store.dispatch('signOut')
  quasar.loading.hide()
  router.push("/")
}

</script>

<style>
section {
  padding-top: 32px;
}

  html, body, #app {
    height: 100%;
    margin: 0 auto;
    background-color: #111111;
  }
  
  @font-face {
    font-family: FuturaBook;
    src: url("../src/assets/futurabook.otf") format("opentype");
  }
  @font-face {
    font-family: FuturaDemi;
    src: url("../src/assets/futurademi.otf") format("opentype");
  }
  @font-face {
    font-family: FuturaLight;
    src: url("../src/assets/futuralight.otf") format("opentype");
  }
  @font-face {
    font-family: FuturaMedium;
    src: url("../src/assets/futuramedium.otf") format("opentype");
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 300px;
    padding-block: 30px;
    padding-inline: 20px;
    border-radius: 4px;
    background-color: white;
    transition: 0.5s ease;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    gap: 6px;
  }
  
  .form h2 {
    font-family: FuturaDemi;
    font-size: 28px;
    margin: 0px;
    align-self: center;
    color: rgb(53, 53, 53);
    text-transform: uppercase;
    user-select: none;
  }

</style>