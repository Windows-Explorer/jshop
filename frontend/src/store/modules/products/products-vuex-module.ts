import { store } from '@/store'
import axios from 'axios'
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
    const result = await axios.get(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products`)

    if(result.status === 200) {
      const products: IProduct[] = await result.data
      return products
    }
    else {
      Dialog.create({ title: "Не удалось", message: result.statusText })
      return []
    }
  }

  @Action({ commit: "currentProductMutation" })
  async getOneProduct(id: number): Promise<IProduct | null> {
    const result = await axios.get(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/${id}`)

    if(result.status === 200) {
      const product: IProduct = await result.data
      return product
    }
    else {
      Dialog.create({ title: "Не удалось", message: result.statusText })
      return null
    }
  }

  @Action({ commit: "productsMutation" })
  async saveManyProducts(payload: IProduct[]): Promise<IProduct[]> {
    const result = await axios.post(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/savemany`, payload, {
      headers: { "Authorization": `Bearer ${store.getters.token}` }
    })

    if(result.status === 200) {
      const products: IProduct[] = await result.data
      return products
    }
    else {
      Dialog.create({ title: "Не удалось", message: result.statusText })
      return this.productsState
    }
  }

  @Action({ commit: "productsMutation" })
  async removeOneProduct(id: number): Promise<IProduct[]> {
    const result = await axios.get(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/remove/${id}`, {
      headers: { "Authorization": `Bearer ${store.getters.token}` }
    })

    if(result.status === 200) {
      const products: IProduct[] = await result.data
      return products
    }
    else {
      Dialog.create({ title: "Не удалось", message: result.statusText })
      return this.productsState
    }
  }

  get products(): IProduct[] {
    return this.productsState
  }
}