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

const myTweak = (offset: number) => { height: offset ? `calc(100vh - ${offset}px)` : '200vh' }

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
  quasar.dark.set(true)

  store.dispatch("getRoleFromJwt")
})


</script>

<style>
  @import url("./styles/main.scss");
  @import url("./styles/fonts.scss");
  @import url("./styles/transitions.scss");
  @import url("./styles/auth.scss");
</style>