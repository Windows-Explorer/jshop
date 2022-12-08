import { VueCookieNext } from 'vue-cookie-next'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IProduct } from './product.interface'

@Module
export class CartStoreModule extends VuexModule {
  cartState: IProduct[] = JSON.parse(VueCookieNext.getCookie("cart")) || []

  @Mutation
  cartMutation(products: IProduct[]): void {
    this.cartState = products
  }

  @Action({ commit: "cartMutation" })
  async getCart(): Promise<IProduct[]> {
    const cart = await JSON.parse(VueCookieNext.getCookie("cart"))
    return cart
  }

  @Action({ commit: "cartMutation" })
  async saveCart(cart: IProduct[]): Promise<IProduct[]> {
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 3600 })
    return cart
  }

}