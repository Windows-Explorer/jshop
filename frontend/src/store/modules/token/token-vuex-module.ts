import { Dialog } from 'quasar'
import { VueCookieNext } from 'vue-cookie-next'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export class TokenStoreModule extends VuexModule {
  tokenState: string = VueCookieNext.getCookie("token") || ""


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
    if(result.status === 200) {
      const token: string = await result.text()
      VueCookieNext.setCookie("token", token)
      return token
    }
    else {
      Dialog.create({
        title: "Unauthorized",
        message: "Some is invalid"
      })
      VueCookieNext.removeCookie("token")
      return ""
    }
  }


  @Action({ commit: "tokenMutation" })
  async signIn(user: { email: string, password: string}): Promise<string> {
    const result = await fetch("http://localhost:3000/auth/signin", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
    })
    if(result.status === 200) {
      const token: string = await result.text()
      VueCookieNext.setCookie("token", token)
      return token
    }
    else{
      Dialog.create({
        title: "Unauthorized",
        message: "Email or password is invalid"
      })
      VueCookieNext.removeCookie("token")
      return ""
    }
  }

  @Action({ commit: "tokenMutation" })
  async signOut(): Promise<string> {
    VueCookieNext.removeCookie("token")
    return ""
  }

  get getToken(): string {
    return this.tokenState
  }

  get isAuthorized(): boolean {
    if (this.tokenState !== "") return true
    else return false
  }
}