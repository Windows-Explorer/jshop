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
  async getTokenFromCookieAction(): Promise<string> {
    return await VueCookieNext.getCookie("token")
  }

  @Action({ commit: "getTokenMutation"})
  async getTokenAction(): Promise<string> {
    return await (await fetch("http://localhost:3000/token")).json()
  }


  get getToken(): string {
    return this.tokenState
  }
}