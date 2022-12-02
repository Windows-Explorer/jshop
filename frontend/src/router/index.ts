import { Loading, LoadingBar, Notify } from 'quasar'
import { VueCookieNext } from 'vue-cookie-next'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const isAuthorized = (): boolean => {
  const token = VueCookieNext.getCookie("token")
  if(token && token !== "") return true
  else return false
}

const authGuard = async (to: any, from: any, next: any) => {
  if(to.name !== 'signin' && !isAuthorized()) {
    Notify.create({
      position: "top",
      message: "Only authorized users",
      timeout: 500,
      type: "info",
      textColor: "primary"
    })
    next({ name: "signin" })
  }
  else {
    next()
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: async () => await import("../views/HomeView.vue")
  },
  {
    path: '/signup',
    name: 'signup',
    component: async () => await import("../views/SignUpView.vue")
  },
  {
    path: '/signin',
    name: 'signin',
    component: async () => await import("../views/SignInView.vue")
  },
  {
    path: "/onlyauthed",
    name: "onlyauthed",
    component: async () => await import("../views/OnlyAuthedView.vue"),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to: any, from: any, next: any) => {
  if(to.name) {
    LoadingBar.start()
  }
  next()
})
router.afterEach((to: any, from: any, next: any) => {
  LoadingBar.stop()
})

export default router