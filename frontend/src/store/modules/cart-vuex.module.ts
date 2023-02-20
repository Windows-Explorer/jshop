import { VueCookieNext } from 'vue-cookie-next'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IProduct } from '../../common/interfaces/product.interface'
import { ICartObject } from '../../common/interfaces/cart-object.interface'

@Module
export class CartStoreModule extends VuexModule {
  cartState: ICartObject[] = JSON.parse(VueCookieNext.getCookie("cart")) || []

  @Mutation
  cartMutation(products: ICartObject[]): void {
    this.cartState = products
  }

  @Action({ commit: "cartMutation" })
  async removeFromCart(product: ICartObject): Promise<IProduct[]> {
    const cart: ICartObject[] = this.cartState || []
    console.log(cart)
    const index = cart.indexOf(product)
    if (index > -1) {
      cart.splice(index, 1)
    }
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 36000 })
    return cart
  }

  @Action({ commit: "cartMutation" })
  async pushIntoCart(cartObject: ICartObject): Promise<IProduct[]> {
    const cart: ICartObject[] = JSON.parse(VueCookieNext.getCookie("cart")) || this.cartState
    cart.push(cartObject)
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 36000 })
    return cart
  }

  @Action({ commit: "cartMutation" })
  async updateCart(cart: ICartObject[]): Promise<ICartObject[]> {
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 36000 })
    return cart
  }

  get cart(): ICartObject[] {
    return this.cartState
  }

}