import { IDialogEmitter } from "./interfaces/dialog-emitter/dialog-emitter.interface"
import { IDialogProps } from "./interfaces/props/dialog.props.interface"

let instance: IDialogEmitter | null = null

export class DialogEmitter implements IDialogEmitter {
    constructor() {
        if (!instance){
            instance = this
        }
        return instance
    }

    async open(props?: IDialogProps): Promise<void> {
        const nuxtApp = useNuxtApp()
        nuxtApp.$dialog.$on.openDialog(props)
    }

    async close(): Promise<void> {
        const nuxtApp = useNuxtApp()
        nuxtApp.$dialog.$on.closeDialog()
    }

}