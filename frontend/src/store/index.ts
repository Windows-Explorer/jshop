import { createStore } from "vuex"
import { TokenStoreModule } from "./modules/token/token-vuex-module"
import { UsersStoreModule } from "./modules/users/users-vuex-module"


export const store = createStore({
    state: {},
    modules: { TokenStoreModule, UsersStoreModule }
})