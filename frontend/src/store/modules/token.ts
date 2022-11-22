import { VueCookieNext } from 'vue-cookie-next'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export class TokenStoreModule extends VuexModule {
  tokenState: string = ""


  @Mutation
  getTokenMutation(token: string): void {
    this.tokenState = token
  }


  @Action({ commit: "getTokenMutation" })
  async getTokenFromCookieAction(): Promise<void> {
    return await VueCookieNext.getCookie("token")
  }


  get getToken(): string {
    return this.tokenState
  }
}