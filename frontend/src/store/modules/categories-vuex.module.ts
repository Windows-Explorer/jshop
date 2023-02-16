import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ICategory } from '@/common/interfaces/category.interface'
import { ISubcategory } from '@/common/interfaces/subcategory.interface'
import { customNotifies } from '@/common/notifies'

@Module
export class CategoriesStoreModule extends VuexModule {
  categoriesState: ICategory[] = []
  subcategoriesState: ISubcategory[] = []

  @Mutation
  categoriesMutation(categories: ICategory[]): void {
    this.categoriesState = categories
  }
  @Mutation
  subcategoriesMutation(subcategories: ISubcategory[]): void {
    this.subcategoriesState = subcategories
  }

  @Action({ commit: "categoriesMutation" })
  async getCategories(): Promise<ICategory[]> {
    try {
      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/categories`)

      if (result.status === 200) {
          const colors: ICategory[] = await result.json()
          return colors
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

  @Action({ commit: "subcategoriesMutation" })
  async getSubcategories(): Promise<ISubcategory[]> {
    try {
      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/subcategories`)

      if (result.status === 200) {
          const colors: ISubcategory[] = await result.json()
          return colors
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

  get categories(): ICategory[] {
    return this.categoriesState
  }
  get subcategories(): ISubcategory[] {
    return this.subcategoriesState
  }

}