import { store } from '@/store'
import { LoadingBar } from 'quasar'
import { createRouter, createWebHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'
import { adminRoutes } from './modules/admin.router.module'
import { authRoutes } from './modules/auth.router.module'
import { productsRoutes } from './modules/products.roter.module'

const defaultTitle = "Континуум"

const routes: RouteRecordRaw[] = authRoutes.concat(productsRoutes, adminRoutes)

const router = createRouter({
  history: createMemoryHistory(),
  routes
})


router.beforeResolve( async (to: any, from: any, next: any) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  if(to.name) {
    store.dispatch("verifyToken")
    store.dispatch("getRoleFromJwt")
  }
  next()
})
router.afterEach(async (to: any, from: any, next: any) => {
})


router.afterEach(async (to: any, from: any) => {
  document.title = to.meta.title || defaultTitle
})

export default router
