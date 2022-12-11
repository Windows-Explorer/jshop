import { Dialog, Loading } from 'quasar'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IProduct } from './product.interface'

@Module
export class ProductsStoreModule extends VuexModule {
  productsState: IProduct[] = []
  currentProductState: IProduct | null = null

  @Mutation
  productsMutation(products: IProduct[]): void {
    this.productsState = products
  }

  @Mutation
  currentProductMutation(product: IProduct): void {
    this.currentProductState = product
  }


  @Action({ commit: "productsMutation" })
  async getProducts(): Promise<IProduct[]> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products`, {
      headers: { 'Authorization': "124512" }
    })

    if(result.status === 200) {
      const books: IProduct[] = await result.json()
      return books
    }
    else {
      Dialog.create({ title: "Не удалось", message: "Some is invalid" })
      return []
    }
  }

  @Action({ commit: "currentProductMutation" })
  async getOneProduct(id: number): Promise<IProduct | null> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/${id}`, {
      headers: { "Authorization": "1243124" }
    })

    if(result.status === 200) {
      const product: IProduct = await result.json()
      return product
    }
    else {
      Dialog.create({ title: "Не удалось", message: "Some is invalid" })
      return null
    }
  }
}