export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('route-tab-active', async (element: HTMLElement, binding: any) => {
        let color = binding.value || "#fff"

        element.onclick = async (mouseEvent: MouseEvent) => {
            console.log(color)
            mouseEvent.stopPropagation()
        }
    })
})