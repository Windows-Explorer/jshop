import { RouteRecordRaw } from "vue-router";

export const mainRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: async () => await import("../../views/HomeView.vue")
    },
    {
        path: '/cards',
        name: 'cards',
        component: async () => await import("../../views/CardsView.vue"),
    },
    {
        path: '/testing',
        name: 'testing',
        component: async () => await import("../../views/TestingView.vue"),
    },
]