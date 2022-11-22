import { createStore } from "vuex"
import { TokenStoreModule } from "./token"


export const store = createStore({
    state: {},
    modules: { TokenStoreModule }
})