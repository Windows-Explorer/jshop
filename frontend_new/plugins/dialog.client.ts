import { createVNode, render } from "vue"
import { IDialogProps } from "~~/common/interfaces/props/dialog.props.interface"

export default defineNuxtPlugin(async (nuxtApp) => {
    const dialogComponent = defineAsyncComponent(async () => import("../components/modal/VDialog.vue"))

    nuxtApp.provide("dialog", {
        $on: {
            openDialog: async (props: IDialogProps) => {
                let dialogVNode = createVNode(dialogComponent, { dialogProps: props })
                dialogVNode.appContext = { ...nuxtApp.vueApp._context }
                render(dialogVNode, nuxtApp.vueApp._container!.children[0])
            },
            closeDialog: async () => {
                render(null, nuxtApp.vueApp._container!.children[0])
            }
        }
    })
})