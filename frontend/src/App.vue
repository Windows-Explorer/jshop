<template>
  <q-layout>

  <transition name="header">
    <q-header v-if="(route.name !=='signup' && route.name !=='signin')" :reveal="true" :elevated="true">
      <q-tabs :align="'left'">
        <LogoDarkIcon :style="'height:36px; margin-inline:28px; cursor:pointer'" @click="router.push({ name: 'home'})" />
        
        <q-route-tab  to="/" label="Игры" />

        <q-route-tab  to="/" label="Книги" />

        <q-route-tab label="Учетная запись">
          <q-menu :transition-show="'jump-up'" :transition-hide="'jump-down'">
            <div class="menu ">
              <q-btn flat v-if="!store.getters.isAuthorized" to="signin" label="Войти" />
              <q-btn flat v-if="!store.getters.isAuthorized" to="signup" label="Регистрация" />
              <q-btn flat v-if="store.getters.isAuthorized" label="Выйти" v-close-popup @click="onLogout()" />
            </div>
          </q-menu>
        </q-route-tab>
      </q-tabs>
    </q-header>
  </transition>

  <q-page-container class="page-container">
    
    <transition name="content">
      <router-view />
    </transition>

  </q-page-container>

  

  </q-layout>
  
</template>

<script lang="ts" setup>

import { defineAsyncComponent } from '@vue/runtime-core'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const LogoDarkIcon = defineAsyncComponent(async () => import("./components/icons/LogoDarkIcon.vue"))

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

  .page-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: stretch;
    justify-content: flex-start;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    font-size: 18px;
    padding: 16px;
  }

  .footer a {
    cursor: pointer;
  }

  .menu {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: stretch;
    padding: 12px;
    gap: 10px;
  }

  section {
    align-self: center;
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
    transition: transform 0.7s ease;
  }

  .header-enter-from,
  .header-leave-to {
    transform: translateY(-100%);
  }

  .content-enter-active,
  .content-leave-active {
    transition: transform 0.7s ease;
  }

  .content-enter-from,
  .content-leave-to {
    transform: translateY(-100%);
  }

  .footer-enter-active,
  .footer-leave-active {
    transition: transform 0.7s ease;
  }

  .footer-enter-from,
  .footer-leave-to {
    transform: translateY(100%);
  }
</style>