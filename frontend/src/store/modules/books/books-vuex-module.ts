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
    Loading.show()
    const result = await fetch("http://localhost:3000/products/books")

    if(result.status === 200) {
      const books: IBook[] = await result.json()
      Loading.hide()
      return books
    }
    else {
      Dialog.create({
        title: "Не удалось",
        message: "Some is invalid"
      })
      Loading.hide()
      return []
    }
  }
}