import useAuthStore from "~~/store/auth.store"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useAuthStore()
    if (await store.isAuthorized()) {
        return navigateTo({ name: "account" })
    }
})