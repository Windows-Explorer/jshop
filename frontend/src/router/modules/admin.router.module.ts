import { customNotifies } from "@/common/notifies"
import { VueCookieNext } from "vue-cookie-next"
import { RouteRecordRaw } from "vue-router"

export const isAdmin = async (): Promise<boolean> => {
  const role = await VueCookieNext.getCookie("role")
  if(role && role === "admin") return true
  else return false
  
}

export const adminGuard = async (to: any, from: any, next: any) => {
  if(!await isAdmin()) {
    customNotifies.dialogs.negative("Ошибка", "Отказано в доступе", false)
    next({ name: "home" })
  }
  else next()
}

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin/edit/products",
    name: "productsEdit",
    component: async () => await import("../../views/admin/ProductEditView.vue"),
    beforeEnter: adminGuard
  },
  {
    path: "/admin/image",
    name: "imageUpload",
    component: async () => await import("../../views/admin/ImageUploadView.vue"),
    beforeEnter: adminGuard
  }
]