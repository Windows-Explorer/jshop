import { RouteRecordRaw } from "vue-router";

export const productsRoutes: RouteRecordRaw[] = [
    {
        path: "/products",
        name: "products",
        component: async () => await import("../../views/ProductsView.vue")
    },
    {
        path: "/products/:id",
        name: "product",
        component: async () => await import("../../views/ProductView.vue")
    },
    {
        path: "/cart",
        name: "cart",
        component: async () => await import("../../views/CartView.vue")
    }
]