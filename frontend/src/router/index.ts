import { store } from '@/store'
import { LoadingBar } from 'quasar'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { adminRoutes } from './modules/admin.router.module'
import { authRoutes } from './modules/auth.router.module'
import { mainRoutes } from './modules/main.router.module'
import { productsRoutes } from './modules/products.roter.module'

const defaultTitle = "Не пропаганда, потому что заблюрено гейство ебаное (без негатива кстати)"

const routes: RouteRecordRaw[] = mainRoutes.concat(authRoutes, adminRoutes, productsRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeResolve( async (to: any, from: any, next: any) => {       
  LoadingBar.start()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  if(to.name) {
    store.dispatch("verifyToken")
    store.dispatch("getRoleFromJwt")
  }
  LoadingBar.stop()
  next()
})
router.afterEach(async (to: any, from: any, next: any) => {
})


router.afterEach(async (to: any, from: any) => {
  document.title = to.meta.title || defaultTitle
})

export default router
