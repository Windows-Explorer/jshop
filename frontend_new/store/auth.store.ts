import { defineStore } from "pinia"
import { IUserSignIn, IUserSignUp } from "~~/common/interfaces/user.interface"
import params from "../params"

const useAuthStore = defineStore('auth', () => {
    const tokenCookie = useCookie("token")
    const roleCookie = useCookie("role")

    const token: Ref<string> = ref(tokenCookie.value || "")
    const role: Ref<string> = ref(roleCookie.value || "")

    async function signUp(user: IUserSignUp) {
        try {
            const result = await fetch(`${params.api_host}/auth/signup`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (result.status === 200) {
                const router = useRouter()
                const tokenString = await result.text()
                await saveToken(tokenString)
                router.push({ path: "/" })
            }
            else await removeToken()
        }
        catch {
            
        }
    }

    async function signIn(user: IUserSignIn) {
        const result = await fetch(`${params.api_host}/auth/signin`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (result.status === 200) {
            const router = useRouter()
            const tokenString = await result.text()
            await saveToken(tokenString)
            router.push({ path: "/" })
        }
        else removeToken()
    }

    async function verifyToken() {
        const result = await fetch(`${params.api_host}/auth/verify`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        })
        if (result.status === 200 || result.status === 201) {
            const tokenString = await result.text()
            saveToken(tokenString)
        }
        else removeToken()
    }

    async function isAuthorized(): Promise<boolean> {
        if (tokenCookie.value == undefined || tokenCookie.value == "") {
            return false
        }
        else {
            return true
        }
    }

    async function getRoleFromToken() {
        try {
            var base64Url = token.value.split('.')[1]

            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''))

            const JSONdataFromToken = await JSON.parse(jsonPayload)
            await saveRole(JSONdataFromToken.role)
        }
        catch {
            await resetRole()
        }
    }

    async function saveToken(tokenString: string) {
        tokenCookie.value = tokenString
        token.value = tokenString
    }
    async function saveRole(roleString: string) {
        roleCookie.value = roleString
        role.value = roleString
    }
    async function resetRole() {
        roleCookie.value = "guest"
        role.value = "guest"
    }
    async function removeToken() {
        tokenCookie.value = ""
        token.value = ""
    }

    return { token, role, signUp, signIn, isAuthorized, verifyToken, getRoleFromToken }
})

export default useAuthStore