import { IDialogActionsProps } from "./dialog.actions.props.interface"

export interface IDialogProps {
    dialogTitle?: string,
    message?: string,
    actions?: IDialogActionsProps
}