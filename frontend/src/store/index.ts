import { createStore } from "vuex"
import { CardStoreModule } from "./modules/card/card-vuex.module"
import { CartStoreModule } from "./modules/cart/cart-vuex.module"
import { FilesStoreModule } from "./modules/files/files-vuex.module"
import { ProductsStoreModule } from "./modules/products/products-vuex.module"
import { TokenStoreModule } from "./modules/token/token-vuex.module"


export const store = createStore({
    state: {},
    modules: { TokenStoreModule, ProductsStoreModule, CartStoreModule, FilesStoreModule, CardStoreModule }
})