import { Notify } from "quasar"
import { VueCookieNext } from "vue-cookie-next"
import { RouteRecordRaw } from "vue-router"

export const isAuthorized = async (): Promise<boolean> => {
  const token = await VueCookieNext.getCookie("token")
  if(token && token !== "") return true
  else return false
}

export const authGuard = async (to: any, from: any, next: any) => {
  if(to.name !== 'signin' && !await isAuthorized()) {
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

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: async () => await import("../../views/HomeView.vue")
  },
  {
    path: '/signup',
    name: 'signup',
    component: async () => await import("../../views/SignUpView.vue"),
    meta: { title: "Регистрация"}
  },
  {
    path: '/signin',
    name: 'signin',
    component: async () => await import("../../views/SignInView.vue"),
    meta: { title: "Авторизация"}
  },
  {
    path: "/onlyauthed",
    name: "onlyauthed",
    component: async () => await import("../../views/admin/ProductEditView.vue"),
    beforeEnter: authGuard
  }
]