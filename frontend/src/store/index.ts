import { createStore } from "vuex"
import { CartStoreModule } from "./modules/cart-vuex.module"
import { FilesStoreModule } from "./modules/files-vuex.module"
import { ProductsStoreModule } from "./modules/products-vuex.module"
import { TokenStoreModule } from "./modules/token-vuex.module"


export const store = createStore({
    state: {},
    modules: { TokenStoreModule, ProductsStoreModule, CartStoreModule, FilesStoreModule }
})