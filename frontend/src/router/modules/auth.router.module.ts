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
    path: '/signup',
    name: 'signup',
    component: async () => await import("../../views/auth/SignUpView.vue"),
    meta: { title: "Регистрация"}
  },
  {
    path: '/signin',
    name: 'signin',
    component: async () => await import("../../views/auth/SignInView.vue"),
    meta: { title: "Авторизация"}
  }
]