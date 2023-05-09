import { autoAnimatePlugin } from "@formkit/auto-animate/vue"

export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.vueApp.use(autoAnimatePlugin)
})