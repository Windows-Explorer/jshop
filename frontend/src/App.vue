<template>
  <q-layout view="hhh Lpr fFf">

  <transition name="header">
    <q-header v-if="(route.name !=='signup' && route.name !=='signin')" :reveal="true" :elevated="true">
      <q-tabs :align="'left'">
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="onlyauthed" label="OnlyAuthed" />
        <q-route-tab v-if="!store.getters.isAuthorized" to="signup" label="SignUp" />
        <q-route-tab v-if="!store.getters.isAuthorized" to="signin" label="SignIn" />
        <q-route-tab v-if="store.getters.isAuthorized" @click="onLogout()" label="Logout"/>
      </q-tabs>
    </q-header>
  </transition>

  <q-page-container :align="'center'">
    <transition name="content">
      <router-view />
    </transition>
  </q-page-container>

  </q-layout>
  
</template>

<script lang="ts" setup>

import { onMounted } from '@vue/runtime-core'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const quasar = useQuasar()
const route = useRoute()


const onLogout = async () => {
  quasar.loading.show()
  await store.dispatch('signOut')
  quasar.loading.hide()
  router.push("/")
}

</script>

<style>
  section {    
    padding-top: 8px;
    color: white;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
  }
  html::-webkit-scrollbar {
    display: none;
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
    width: 360px;
    padding-block: 30px;
    padding-inline: 20px;
    border-radius: 4px;
    background-color: transparent;
    transition: 0.5s ease;
    gap: 8px;
  }
  
  .form .buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px;
  }

  .form .redirect-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 10px;
  }
  .form .redirect-container .redirect {
      cursor: pointer;
      text-decoration: none;
      color: white;
  }

  .header-enter-active,
  .header-leave-active {
    transition: transform 0.7s cubic-bezier(1,-0.26,.12,1.33);
  }

  .header-enter-from,
  .header-leave-to {
    transform: translateY(-100%);
  }

  .content-enter-active,
  .content-leave-active {
    transition: transform 0.7s cubic-bezier(1,-0.26,.12,1.33);
  }

  .content-enter-from,
  .content-leave-to {
    transform: translateY(-100%);
  }
</style>