import { createStore } from "vuex"
import { TokenStoreModule } from "./modules/token"


export const store = createStore({
    state: {},
    modules: { TokenStoreModule }
})