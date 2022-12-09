import { Dialog, Loading } from 'quasar'
import { VueCookieNext } from 'vue-cookie-next'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IProduct } from '../products/product.interface'
import { ICartObject } from './cart-object.interface'

@Module
export class CartStoreModule extends VuexModule {
  cartState: IProduct[] = JSON.parse(VueCookieNext.getCookie("cart")) || []

  @Mutation
  cartMutation(products: IProduct[]): void {
    this.cartState = products
  }

  // @Action({ commit: "cartMutation" })
  // async getCart(): Promise<ICartObject[]> {
  //   const cart = await JSON.parse(VueCookieNext.getCookie("cart"))
  //   return cart
  // }

  @Action({ commit: "cartMutation" })
  async pushIntoCart(cartObject: IProduct): Promise<IProduct[]> {
    Loading.show()
    const cart = this.cartState || []
    
    cart.push(cartObject)
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 36000 })
    Loading.hide()
    return cart
  }

  @Action({ commit: "cartMutation" })
  async updateCart(cart: ICartObject[]): Promise<ICartObject[]> {
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 36000 })
    return cart
  }

  get cart(): IProduct[] {
    return this.cartState
  }

}