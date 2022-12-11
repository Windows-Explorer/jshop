import { createStore } from "vuex"
import { CartStoreModule } from "./modules/cart/cart-vuex-module"
import { ProductsStoreModule } from "./modules/products/products-vuex-module"
import { TokenStoreModule } from "./modules/token/token-vuex-module"


export const store = createStore({
    state: {},
    modules: { TokenStoreModule, ProductsStoreModule, CartStoreModule }
})