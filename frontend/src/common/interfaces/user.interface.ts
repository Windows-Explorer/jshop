import { Router } from "vue-router"

export interface UserSignIn {
    id?: number,
    email: string,
    password: string

}
export interface UserSignUp {
    id?: number,
    username: string,
    email: string,
    phoneNumber: string
}

export interface AuthPayload {
    user: UserSignIn | UserSignUp
    router: Router 
}