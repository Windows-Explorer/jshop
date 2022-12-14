<template>
  <q-layout>
    <transition name="header">
      <q-header v-if="(route.name !=='signup' && route.name !=='signin')"
        reveal
        elevated
      >
      <admin-layout v-if="store.getters.role === 'admin'" />
        <q-tabs :dense="false" :align="'left'">
          <LogoDarkIcon :style="'height:36px; margin-inline:28px; cursor:pointer;'" @click="router.push({ name: 'home'})" />

          <q-route-tab to="/products" label="Продукты" />
          <q-route-tab to="/cart" label="Корзина" />

          <q-route-tab label="Учетная запись">
            <q-menu :transition-show="'jump-up'" :transition-hide="'jump-down'">
              <div class="menu">
                <q-btn flat v-if="!store.getters.isAuthorized" to="signin" label="Войти" />
                <q-btn flat v-if="!store.getters.isAuthorized" to="signup" label="Регистрация" />
                <q-btn flat v-if="store.getters.isAuthorized" label="Выйти" v-close-popup @click="onLogout()" />
              </div>
            </q-menu>
          </q-route-tab>
        </q-tabs>
      </q-header>
    </transition>

    <q-page-container class="page-container" :style="myTweak">
      <transition name="content">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
  
</template>

<script lang="ts" setup>

import { defineAsyncComponent, onMounted } from '@vue/runtime-core'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const LogoDarkIcon = defineAsyncComponent(async () => import("./components/icons/LogoDarkIcon.vue"))
const AdminLayout = defineAsyncComponent(async () => import("./components/admin/AdminLayout.vue"))

const store = useStore()
const router = useRouter()
const quasar = useQuasar()
const route = useRoute()

const myTweak = async (offset: number) => { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }

const onLogout = async () => {
  quasar.loading.show()
  await store.dispatch('signOut', router)
  quasar.loading.hide()
}


onMounted(async () => {
  quasar.loadingBar.setDefaults({
    color: "negative",
    hijackFilter (url: any) {
      return /^http:\/\/\./.test(url)
    }
  })

  store.dispatch("getRoleFromJwt")
})


</script>

<style>

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }

  .page-container {
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: stretch;
    justify-content: flex-start;
  }

  header {
    font-family: Colus;
  }

  .menu {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: stretch;
    padding: 12px;
    gap: 10px;
    font-family: Colus;
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
    box-sizing: border-box;
  }
  
  @font-face {
    font-family: SpectralRegular;
    src: url("../src/assets/Spectral-Regular.ttf") format("truetype");
  }
  @font-face {
    font-family: Colus;
    src: url("../src/assets/Colus.ttf") format("truetype");
  }

  .form {
    font-family: SpectralRegular;
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
    font-family: Colus;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
  }

  .form .redirect-container {
    font-family: SpectralRegular;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
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