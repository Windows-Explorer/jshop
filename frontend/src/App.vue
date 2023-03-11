<template>
  <q-layout>
    <admin-layout v-if="store.getters.role === 'admin'" />
    <the-header />
    <!-- <q-page-container :style="{ padding: '0px' }" class="page-container">
        <router-view />
        <footer-down />
    </q-page-container> -->

  </q-layout>
  
</template>

<script lang="ts" setup>

import { defineAsyncComponent, onMounted } from '@vue/runtime-core'
import { useQuasar } from 'quasar'
import { VueCookieNext } from 'vue-cookie-next';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const AdminLayout = defineAsyncComponent(async () => import("./components/admin/AdminLayout.vue"))
const HeaderLayout = defineAsyncComponent(async () => import("./components/HeaderLayout.vue"))
const AuthHeader = defineAsyncComponent(async () => import("./components/AuthHeader.vue"))
const FooterDown = defineAsyncComponent(async () => import("./components/FooterDown.vue"))
const TheHeader = defineAsyncComponent(async () => import("./components/TheHeader.vue"))

const store = useStore()
const router = useRouter()
const quasar = useQuasar()
const route = useRoute()

const acceptCookie = async () => {
  VueCookieNext.setCookie("cookie_accepted", "true")
}
const isCookieAccepted = async (): Promise<boolean> => {
  return VueCookieNext.isCookieAvailable("cookie_accepted") && Boolean(VueCookieNext.getCookie("cookie_accepted"))
}

const showCookieAccept = async () => {
  let personalDataPolicyHref: string = router.resolve({ name: "personaldatapolicy"}).href
  if(!(await isCookieAccepted())) {
    quasar.dialog({
      message: `Мы используем файлы cookie. Продолжив работу с сайтом, вы соглашаетесь <a href="${personalDataPolicyHref}" class=notify-redirect>Политикой обработки персональных данных</a>. `,
      html: true,
      position: "bottom",
      persistent: true,
      seamless: true,
      focus: "none",
      cancel: false,
      ok: { flat: true, onclick: async () => acceptCookie()}
    })
  }
}


onMounted(async () => {
  quasar.loadingBar.setDefaults({
    color: "accent"
  })
  showCookieAccept()
  store.dispatch("getRoleFromJwt")
})


</script>