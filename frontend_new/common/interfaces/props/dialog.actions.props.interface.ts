export interface IDialogActionsProps {
    accept: {
        label: string,
        action?: Promise<void> | void,
        use?: boolean
    },
    cancel: {
        label: string,
        action?: Promise<void> | void,
        use?: boolean
    }
}