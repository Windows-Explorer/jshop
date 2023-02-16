import { RouteRecordRaw } from "vue-router"

export const mainRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: async () => await import("../../views/HomeView.vue")
    },
    {
        path: "/help/personaldatapolicy",
        name: "personaldatapolicy",
        component: async () => await import("../../views/help/PersonalDataPolicyView.vue")
    }
]