import { Notify } from "quasar"

export const customNotifies = {
    positiveNotify: async (): Promise<void> => {
        Notify.create({
            message: "Успешно",
            type: "positive",
            timeout: 500
        })
    },
    negativeNotify: async (): Promise<void> => {
        Notify.create({
            message: "Не удалось",
            type: "negative",
            timeout: 500
        })
    }
}