import router from "@/router"
import { Dialog, Notify } from "quasar"

export const customNotifies = {
    notifies: {
        positive: async (message?: any): Promise<void> => {
            Notify.create({
                message: message ||  "Успешно",
                type: "positive",
                timeout: 500
            })
        },
        negative: async (message?: any): Promise<void> => {
            Notify.create({
                message: message || "Не удалось",
                type: "negative",
                timeout: 500
            })
        }
    },
    dialogs: {
        positive: async (title?: any, message?: any): Promise<void> => {
            Dialog.create({
                title: title || "Успешно",
                message: message || "",
            })
        },
        negative: async (title?: any, message?: any, reloadble?: boolean): Promise<void> => {
            Dialog.create({
                title: title || "Ошибка",
                message: message || "Что-то пошло не так",
                color: "negative",
                transitionShow: "jump-up",
                transitionHide: "jump-down",
                cancel: reloadble ? { label: "Обновить страницу", flat: true, onclick: async () => { window.location.reload() } } : false,
                ok: { label: "ОК", flat: true }
            })
        }
    }
}