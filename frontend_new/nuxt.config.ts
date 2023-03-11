export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: "@use '@/assets/colors.scss' as *;"
                }
            }
        }
    },
    css: [
        "~/assets/index.scss"
    ]
})
