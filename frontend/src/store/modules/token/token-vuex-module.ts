import { Dialog, Loading } from 'quasar'
import { VueCookieNext } from 'vue-cookie-next'
import { Router } from 'vue-router'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { AuthPayload } from './user.interface'

@Module
export class TokenStoreModule extends VuexModule {
  tokenState: string = VueCookieNext.getCookie("token") || ""


  @Mutation
  tokenMutation(token: string): void {
    this.tokenState = token
  }


  @Action({ commit: "tokenMutation" })
  async signUp(payload: AuthPayload): Promise<string> {
    const user = payload.user
    const router = payload.router!

    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/auth/signup`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
    })
    if(result.status === 200) {
      const token: string = await result.text()
      VueCookieNext.setCookie("token", token)
      router.push({ name: "home"})
      return token
    }
    else {
      Dialog.create({ title: "Unauthorized", message: "Some is invalid" })
      VueCookieNext.removeCookie("token")
      return ""
    }
  }


  @Action({ commit: "tokenMutation" })
  async signIn(payload: AuthPayload): Promise<string> {
    const user = payload.user
    const router: Router = payload.router!

    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/auth/signin`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
    })
    if(result.status === 200) {
      const token: string = await result.text()
      VueCookieNext.setCookie("token", token)
      router.push({ name: "home"})
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