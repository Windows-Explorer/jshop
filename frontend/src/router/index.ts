import { store } from '@/store'
import { LoadingBar, Notify } from 'quasar'
import { VueCookieNext } from 'vue-cookie-next'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const defaultTitle = "Континуум"

const isAuthorized = (): boolean => {
  const token = VueCookieNext.getCookie("token")
  if(token && token !== "") return true
  else return false
}

const authGuard = async (to: any, from: any, next: any) => {
  if(to.name !== 'signin' && !isAuthorized()) {
    Notify.create({
      position: "bottom",
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
    component: async () => await import("../views/SignUpView.vue"),
    meta: { title: "Регистрация"}
  },
  {
    path: '/signin',
    name: 'signin',
    component: async () => await import("../views/SignInView.vue"),
    meta: { title: "Авторизация"}
  },
  {
    path: "/onlyauthed",
    name: "onlyauthed",
    component: async () => await import("../views/OnlyAuthedView.vue"),
    beforeEnter: authGuard
  },
  {
    path: "/products",
    name: "products",
    component: async () => await import("../views/ProductsView.vue")
  },
  {
    path: "/products/:id",
    name: "product",
    component: async () => await import("../views/ProductView.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: async () => await import("../views/CartView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeResolve( async (to: any, from: any, next: any) => {
  if(to.name) {
    // LoadingBar.start()
    store.dispatch("verifyToken")
  }
  next()
})
router.afterEach(async (to: any, from: any, next: any) => {
  // LoadingBar.stop()
})


router.afterEach(async (to: any, from: any) => {
  document.title = to.meta.title || defaultTitle
})

export default router