import { Dialog, Loading } from 'quasar'
import { VueCookieNext } from 'vue-cookie-next'
import { Router } from 'vue-router'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { AuthPayload } from './user.interface'

@Module
export class TokenStoreModule extends VuexModule {
  
  tokenState: string = VueCookieNext.getCookie("token") || ""
  roleState: string = VueCookieNext.getCookie("role") || "guest"

  @Mutation
  roleMutation(role: string): void {
    this.roleState = role
  }
  @Mutation
  tokenMutation(token: string): void {
    this.tokenState = token
  }


  @Action({ commit: "tokenMutation" })
  async signUp(payload: AuthPayload): Promise<string> {
    const user = payload.user
    const router = payload.router!
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/auth/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    if(result.status === 200 || result.status === 201) {
      const token: string = await result.text()
      VueCookieNext.setCookie("token", token)
      router.push({ name: "home"})
      return token
    }
    Dialog.create({ title: "Не авторизован", message: "Что-то пошло не так" })
    VueCookieNext.removeCookie("token")
    return ""
  }


  @Action({ commit: "tokenMutation" })
  async signIn(payload: AuthPayload): Promise<string> {
    const user = payload.user
    const router: Router = payload.router!
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/auth/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    if(result.status === 200 || result.status === 201) {
      const token: string = await result.text()
      VueCookieNext.setCookie("token", token)
      router.push({ name: "home"})
      return token
    }
    Dialog.create({ title: "Не авторизован", message: "Логин или пароль введены неверно" })
    VueCookieNext.removeCookie("token")
    return ""
  }

  @Action({ commit: "tokenMutation"})
  async verifyToken(): Promise<string> {
    if (this.tokenState !== "") {
      const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/auth/verify`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${this.tokenState}` }
      })
      if (result.status === 200 || result.status === 201) {
        const token = await result.text()
        if (token !== "") {
          return token
        }
      }
    }

    VueCookieNext.removeCookie("token")
    return ""
  }


  @Action({ commit: "tokenMutation" })
  async signOut(router: Router): Promise<string> {
    VueCookieNext.removeCookie("token")
    router.go(0)
    return ""
  }

  @Action({ commit: "roleMutation" })
  async getRoleFromJwt(): Promise<string> {
    try {
      var base64Url: string = this.tokenState.split('.')[1]

      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))

      const result = await JSON.parse(jsonPayload)
      VueCookieNext.setCookie("role", result.role)
      return result.role
    }
    catch {
      VueCookieNext.setCookie("role", "guest")
      return "guest"
    }
  }

  get role(): string {
    return this.roleState
  }

  get token(): string {
    return this.tokenState
  }

  get isAuthorized(): boolean {
    if (this.tokenState !== "") return true
    else return false
  }
}