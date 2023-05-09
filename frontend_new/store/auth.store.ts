import { defineStore, StateTree } from "pinia"
import { IUserSignUp } from "~~/common/interfaces/user.interface"
import params from "../params"

const useAuthStore = defineStore('auth', () => {
    const token: Ref<string> = ref("")
    async function signUp(user: IUserSignUp): Promise<void> {
        const cookie = useCookie("token")
        const result = await fetch(`${params.api_host}/auth/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (result.status === 200) {
            const tokenString = await result.text()
            cookie.value = tokenString
            token.value = tokenString
        }
        else {
            cookie.value = ""
            token.value = ""
        }
    }
    return { token, signUp }
})

export default useAuthStore