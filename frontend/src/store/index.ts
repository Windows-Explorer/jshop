import { createStore } from "vuex"
import { GamesStoreModule } from "./modules/games/games-vuex-module"
import { TokenStoreModule } from "./modules/token/token-vuex-module"


export const store = createStore({
    state: {},
    modules: { TokenStoreModule, GamesStoreModule }
})