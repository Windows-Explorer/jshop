export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('parent-position', async (element: HTMLElement, binding: any) => {
        let offset = element.parentElement?.getBoundingClientRect()
        element.style.top = `${offset?.top}px`
        element.style.left = `${offset?.top}px`
        element.innerHTML = `<span>${offset?.top}px ${offset?.left}px</span>`
    })
})