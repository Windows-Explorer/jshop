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
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    modules: [
        '@pinia/nuxt',
        '@formkit/nuxt',
    ],
    formkit: {
        configFile: "./formkit.config.ts",
    },
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
        "~/components/contact-page",
        "~/components/about-page",
        "~/components/user-page",
        "~/components/coffee-page",
        "~/components/admin"
    ]
})
