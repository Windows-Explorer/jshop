import { store } from '@/store'
import { customNotifies } from '@/common/notifies'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IProduct } from '../../common/interfaces/product.interface'
import { IProductsFilter } from '@/common/interfaces/products-filter.interface'

@Module
export class ProductsStoreModule extends VuexModule {
  productsState: IProduct[] = []
  productsCountState: { count: number } = { count: 0 }
  currentProductState: IProduct | null = null

  @Mutation
  productsMutation(products: IProduct[]): void {
    this.productsState = products
  }
  @Mutation
  productsCountMutation(count: { count: 0 }): void {
    this.productsCountState = count
  }
  @Mutation
  currentProductMutation(product: IProduct): void {
    this.currentProductState = product
  }


  @Action({ commit: "productsMutation" })
  async getProducts(payload: { page?: number, filter?: IProductsFilter | any }): Promise<IProduct[]> {
    try {
      let pageParam: string | number = ""
      let filterParams: string = ""

      if (payload.filter) {
        Object.keys(payload.filter).forEach(key => {
          if (payload.filter[key]) filterParams += `&${key}=${payload.filter[key]}`
        })
      }
      if (payload.page) {
        pageParam = `page=${payload.page}`
      }

      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products?${pageParam}${filterParams}`)

      if (result.status === 200) {
        const products: IProduct[] = await result.json()
        return products
      }
      else {
        customNotifies.dialogs.negative(result.status, result.statusText)
        return []
      }
    }
    catch {
      customNotifies.dialogs.negative(null, null, true)
      return []
    }
  }

  @Action({ commit: "productsCountMutation" })
  async getProductsCount(payload: { page?: number, filter?: IProductsFilter | any }): Promise<{ count: number }> {
    try {
      let pageParam: string | number = ""
      let filterParams: string = ""

      if (payload.filter) {
        Object.keys(payload.filter).forEach(key => {
          if (payload.filter[key]) filterParams += `&${key}=${payload.filter[key]}`
        })
      }
      if (payload.page) {
        pageParam = `page=${payload.page}`
      }

      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/count?${pageParam}${filterParams}`)

      if (result.status === 200) {
        const products: { count: number } = await result.json()
        return products
      }
      else {
        customNotifies.dialogs.negative(result.status, result.statusText)
        return { count: 0 }
      }
    }
    catch {
      customNotifies.dialogs.negative(null, null, true)
      return { count: 0 }
    }
  }

  @Action({ commit: "currentProductMutation" })
  async getProductById(id: number): Promise<IProduct | null> {
    try {
      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (result.status === 200) {
        const product: IProduct = await result.json()
        return product
      }
      else {
        customNotifies.dialogs.negative(result.status, result.statusText)
        return null
      }
    }
    catch {
      customNotifies.dialogs.negative()
      return null
    }
  }

  @Action({ commit: "productsMutation" })
  async saveProduct(payload: { product: IProduct, file: File }): Promise<IProduct[]> {
    try {
      payload.product.image = `${process.env.VUE_APP_GATEMAY_ADDRESS}/images/${payload.file.name}`

      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${store.getters.token}`
        },
        body: JSON.stringify(payload.product)
      })

      if (result.status === 200) {
        const products: IProduct[] = await result.json()
        let formData: FormData = new FormData()
        formData.append("file", payload.file)

        const imageUploadResult = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/image`, {
          method: "POST",
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${store.getters.token}`
          },
          body: formData
        })

        if (imageUploadResult.status === 200 || imageUploadResult.status === 201) {
          customNotifies.notifies.positive()
          return products
        }
      }
      return this.productsState
    }
    catch {
      customNotifies.notifies.negative()
      return this.productsState
    }
  }


  @Action({ commit: "productsMutation" })
  async removeProduct(id: number): Promise<IProduct[]> {
    try {
      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${store.getters.token}`
        }
      })

      if (result.status === 200) {
        const products: IProduct[] = await result.json()
        customNotifies.notifies.positive()
        return products
      }
      else {
        customNotifies.notifies.negative(result.statusText)
        return this.productsState
      }
    }
    catch {
      customNotifies.notifies.negative()
      return this.productsState
    }
  }


  get products(): IProduct[] {
    return this.productsState
  }
}