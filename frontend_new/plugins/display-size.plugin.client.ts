export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            display: {
                getWidth: () => { return window.innerWidth },
                getHeight: () => { return window.innerHeight }
            }
        }
    }
})