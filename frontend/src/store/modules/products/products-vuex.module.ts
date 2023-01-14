import { store } from '@/store'
import { customNotifies } from '@/store/notifies'
import axios from 'axios'
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
      customNotifies.negativeNotify()
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
      customNotifies.negativeNotify()
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
      customNotifies.positiveNotify()
      return products
    }
    else {
      customNotifies.negativeNotify()
      return this.productsState
    }
  }


  @Action({ commit: "productsMutation" })
  async saveOneProduct(payload: { product: IProduct, file: File }): Promise<IProduct[]> {

    payload.product.image = `${process.env.VUE_APP_GATEMAY_ADDRESS}/images/${payload.file.name}`

    const result = await axios.post(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/save`, payload.product, {
      headers: { "Authorization": `Bearer ${store.getters.token}` }
    })
    if(result.status === 200) {
      const products: IProduct[] = await result.data
      let formData: FormData = new FormData() 
      await formData.append("file", payload.file)

      const imageUploadResult = await axios.post(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/save/image`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Bearer ${store.getters.token}`
          }
      })

      if(imageUploadResult.status === 200 || imageUploadResult.status === 201) {
        customNotifies.positiveNotify()
        return products
      }
    }
    
    customNotifies.negativeNotify()
    return this.productsState
  }


  @Action({ commit: "productsMutation" })
  async removeOneProduct(id: number): Promise<IProduct[]> {
    const result = await axios.get(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/remove/${id}`, {
      headers: { "Authorization": `Bearer ${store.getters.token}` }
    })

    if(result.status === 200) {
      const products: IProduct[] = await result.data
      customNotifies.positiveNotify()
      return products
    }
    else {
      customNotifies.negativeNotify()
      return this.productsState
    }
  }


  get products(): IProduct[] {
    return this.productsState
  }
}