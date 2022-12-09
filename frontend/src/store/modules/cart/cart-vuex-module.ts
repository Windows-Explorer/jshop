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
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 3600 })
    Loading.hide()
    return cart
  }

  // @Action({ commit: "cartMutation" })
  // async saveCart(products: IProduct[]): Promise<ICartObject[]> {
  //   const cart = async () => products.map(product => product.id)
  //   VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 3600 })
  //   return await cart()
  // }

  get cart(): IProduct[] {
    return this.cartState
  }

}