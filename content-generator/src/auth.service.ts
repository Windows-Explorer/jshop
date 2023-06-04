import { IUserSignUp } from "./interfaces/user.interface"
import { ParamsAPI } from "./params"

export class AuthService {
    async getToken(userSignUp: IUserSignUp): Promise<string> {
        const responseSignUp = await fetch(`${ParamsAPI.api_host}/auth/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userSignUp)
        })
        if (responseSignUp.ok) {
            return await responseSignUp.text()
        }
        else {
            const responseSignIn = await fetch(`${ParamsAPI.api_host}/auth/signin`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userSignUp)
            })
            return await responseSignIn.text()
        }
    }
}