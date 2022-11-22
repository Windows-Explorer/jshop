import { GetterTree } from "vuex"
import { state, State, User } from "./state"

export type Getters = {
    getUsers(): User[]
}

export const getters: GetterTree<State, State> & Getters = {
    getUsers() {
        return state.users
    }
}