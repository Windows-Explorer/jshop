import { defineStore, StateTree } from "pinia"
import { IUserSignUp } from "~~/common/interfaces/user.interface"

const useAuthStore = defineStore('auth', () => {

    const token: Ref<string> = ref("")

    async function signUp(user: IUserSignUp): Promise<void> {
        const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/auth/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        token.value = await result.text()

    }


    return { token, signUp }
})

export default useAuthStore