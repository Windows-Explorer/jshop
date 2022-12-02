import { createStore } from "vuex"
import { TokenStoreModule } from "./modules/token/token-vuex-module"


export const store = createStore({
    state: {},
    modules: { TokenStoreModule }
})