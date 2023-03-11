export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('ripple', async (element: HTMLElement, binding: any) => {
        let color = binding.value || "#fff"

        element.style.position = 'relative'
        element.style.overflow = 'hidden'

        element.onclick = async (mouseEvent: MouseEvent) => {
            createRipple(element, mouseEvent, color, 800)
        }
    })
})

async function createRipple(element: HTMLElement, mouseEvent: MouseEvent, color: string, timing: number) {
    var circle = document.createElement('div')
    var offset = element.getBoundingClientRect()
    var x = mouseEvent.pageX - offset.left - document.body.scrollLeft
    var y = mouseEvent.pageY - offset.top - document.body.scrollTop

    circle.setAttribute('style',
        `
                background: ${color};
                width: 1px;
                height: 1px;
                border-radius: 100em;
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                animation: ripple ${timing / 1000}s infinite cubic-bezier(0.48, 1.05, 0.69, 0.44);
                
            `)


    element.append(circle)
    mouseEvent.stopPropagation()
    // setTimeout(async () => {
    //     circle.parentNode?.removeChild(circle)
    // }, timing)
}