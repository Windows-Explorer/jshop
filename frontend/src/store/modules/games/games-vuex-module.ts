import { Dialog, Loading } from 'quasar'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IGame } from './game.interface'

@Module
export class GamesStoreModule extends VuexModule {
  gamesState: IGame[] = []


  @Mutation
  gamesMutation(games: IGame[]): void {
    this.gamesState = games
  }


  @Action({ commit: "gamesMutation" })
  async getGames(): Promise<IGame[]> {
    Loading.show()
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/products/games`)

    if(result.status === 200) {
      const games: IGame[] = await result.json()
      Loading.hide()
      return games
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