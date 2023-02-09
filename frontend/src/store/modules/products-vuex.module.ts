import { store } from '@/store'
import { customNotifies } from '@/common/notifies'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IProduct } from '../../common/interfaces/product.interface'
import { IProductsFilter } from '@/common/interfaces/products-filter.interface'

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
  async getProducts(payload: { page: number, filter?: IProductsFilter | any }): Promise<{result: IProduct[], count: number}> {

      let filterParams: string = ""
      if(payload.filter) {
          Object.keys(payload.filter).forEach(key => {
              if(payload.filter[key]) filterParams += `&${key}=${payload.filter[key]}`
          })
      }

      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/cards?page=${payload.page}${[filterParams]}`)

      if (result.status === 200) {
          const cards: { result: IProduct[], count: number } = await result.json()
          customNotifies.positiveNotify()
          return cards
      }
      else {
          customNotifies.negativeNotify()
          return {result: [], count: 0}
      }
  }

  @Action({ commit: "currentProductMutation" })
  async getProductById(id: number): Promise<IProduct | null> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(result.status === 200) {
      const product: IProduct = await result.json()
      return product
    }
    else {
      customNotifies.negativeNotify()
      return null
    }
  }

  @Action({ commit: "productsMutation" })
  async saveProduct(payload: { product: IProduct, file: File }): Promise<IProduct[]> {

    payload.product.image = `${process.env.VUE_APP_GATEMAY_ADDRESS}/images/${payload.file.name}`

    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products`, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${store.getters.token}`
      },
      body: JSON.stringify(payload.product)
    })
    
    if(result.status === 200) {
      const products: IProduct[] = await result.json()
      let formData: FormData = new FormData() 
      formData.append("file", payload.file)

      const imageUploadResult = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/save/image`, {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${store.getters.token}`
        },
        body: formData
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
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/remove/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${store.getters.token}`
      }
    })

    

    if(result.status === 200) {
      const products: IProduct[] = await result.json()
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