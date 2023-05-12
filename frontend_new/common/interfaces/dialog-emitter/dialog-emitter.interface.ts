import { IDialogProps } from "../props/dialog.props.interface"

export interface IDialogEmitter {
    open(props?: IDialogProps): Promise<void>
    close(): Promise<void>
}