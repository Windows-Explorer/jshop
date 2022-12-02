import { Loading, LoadingBar } from 'quasar'
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
    component: () => import("../views/HomeView.vue"),
    beforeEnter: authGuard
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import("../views/SignUpView.vue")
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import("../views/SignInView.vue")
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