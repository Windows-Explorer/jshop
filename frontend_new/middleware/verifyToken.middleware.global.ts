import useAuthStore from "~~/store/auth.store"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    authStore.verifyToken()
})