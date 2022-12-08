import { Dialog, Loading } from 'quasar'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IProduct } from './product.interface'

@Module
export class ProductsStoreModule extends VuexModule {
  booksState: IProduct[] = []
  gamesState: IProduct[] = []

  @Mutation
  gamesMutation(games: IProduct[]): void {
    this.gamesState = games
  }

  @Mutation
  booksMutation(books: IProduct[]): void {
    this.booksState = books
  }


  @Action({ commit: "booksMutation" })
  async getBooks(): Promise<IProduct[]> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/books`)

    if(result.status === 200) {
      const books: IProduct[] = await result.json()
      return books
    }
    else {
      Dialog.create({ title: "Не удалось", message: "Some is invalid" })
      return []
    }
  }

  @Action({ commit: "gamesMutation" })
  async getGames(): Promise<IProduct[]> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/games`)

    if(result.status === 200) {
      const games: IProduct[] = await result.json()
      return games
    }
    else {
      Dialog.create({ title: "Не удалось", message: "Some is invalid" })
      return []
    }
  }
}