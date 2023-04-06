export default defineNuxtConfig({
    app: {
        head: {
            title: "Beans",
            link: [
                { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
                { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
                { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
                { rel: "manifest", href: "/site.webmanifest" }
            ]
        },
    },
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
        "~/components/icons",
        "~/components/Buttons",
        "~/components/home-page",
        "~/components/contact-page"
    ]
})
