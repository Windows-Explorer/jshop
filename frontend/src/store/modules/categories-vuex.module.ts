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
      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/categories`)

      if (result.status === 200) {
          const colors: ICategory[] = await result.json()
          customNotifies.positiveNotify()
          return colors
      }
      else {
          customNotifies.negativeNotify()
          return []
      }
  }

  @Action({ commit: "subcategoriesMutation" })
  async getSubcategories(): Promise<ISubcategory[]> {
      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/subcategories`)

      if (result.status === 200) {
          const colors: ISubcategory[] = await result.json()
          return colors
      }
      else {
          customNotifies.negativeNotify()
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