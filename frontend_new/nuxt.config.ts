export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: "@use '@/assets/css/colors.scss' as *;"
                }
            }
        }
    },
    css: [
        "~/assets/css/index.scss"
    ],
    components: [
        "~/components",
        "~/components/icons"
    ]
})
