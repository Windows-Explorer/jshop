import { VueCookieNext } from 'vue-cookie-next'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export class TokenStoreModule extends VuexModule {
  tokenState: string = ""


  @Mutation
  tokenMutation(token: string): void {
    this.tokenState = token
  }


  @Action({ commit: "tokenMutation" })
  async signUp(user: { username: string, email: string, password: string}): Promise<string> {
    const result = await fetch("http://localhost:3000/auth/signup", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
    })
    const token: string = await result.text()

    VueCookieNext.setCookie("token", token)

    return token
  }


  @Action({ commit: "tokenMutation" })
  async signIn(user: { email: string, password: string}): Promise<string> {
    const result = await fetch("http://localhost:3000/auth/signin", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
    })
    const token: string = await result.text()

    VueCookieNext.setCookie("token", token)

    return token
  }

  @Action({ commit: "tokenMutation" })
  async getTokenFromCookieAction(): Promise<string> {
    return await VueCookieNext.getCookie("token")
  }

  get getToken(): string {
    return this.tokenState
  }
}