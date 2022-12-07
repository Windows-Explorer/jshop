import { Dialog, Loading } from 'quasar'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IBook } from './book.interface'

@Module
export class BooksStoreModule extends VuexModule {
  booksState: IBook[] = []


  @Mutation
  booksMutation(books: IBook[]): void {
    this.booksState = books
  }


  @Action({ commit: "booksMutation" })
  async getBooks(): Promise<IBook[]> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/books`)

    if(result.status === 200) {
      const books: IBook[] = await result.json()
      return books
    }
    else {
      Dialog.create({ title: "Не удалось", message: "Some is invalid" })
      return []
    }
  }
}