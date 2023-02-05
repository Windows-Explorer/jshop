import { VueCookieNext } from 'vue-cookie-next'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IProduct } from '../../common/interfaces/product.interface'
import { ICartObject } from '../../common/interfaces/cart-object.interface'

@Module
export class CartStoreModule extends VuexModule {
  cartState: IProduct[] = JSON.parse(VueCookieNext.getCookie("cart")) || []

  @Mutation
  cartMutation(products: IProduct[]): void {
    this.cartState = products
  }

  @Action({ commit: "cartMutation" })
  async removeFromCart(product: IProduct): Promise<IProduct[]> {
    const cart: IProduct[] = this.cartState || []
    console.log(cart)
    const index = cart.indexOf(product)
    if (index > -1) {
      cart.splice(index, 1)
    }
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 36000 })
    return cart
  }

  @Action({ commit: "cartMutation" })
  async pushIntoCart(cartObject: IProduct): Promise<IProduct[]> {
    const cart: IProduct[] = await JSON.parse(VueCookieNext.getCookie("cart")) || []
    
    cart.push(cartObject)
    VueCookieNext.setCookie("cart", JSON.stringify(cart), { expire: 36000 })
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