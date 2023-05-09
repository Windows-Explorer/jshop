import { ru } from "@formkit/i18n"
import { createAutoAnimatePlugin } from "@formkit/addons"

const config = {
    locales: { ru },
    locale: "ru",
    plugins: [
        createAutoAnimatePlugin()
    ]
}


export default config