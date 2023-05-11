export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.vueApp.directive("header-by-scroll", async (element: HTMLElement) => {
        window.addEventListener("scroll", async (event: Event) => {
            if (window.scrollY > 50) {
                element.style.backgroundColor = "red"
            }
            else {
                element.style.background = "green"
            }
        })
    })
})