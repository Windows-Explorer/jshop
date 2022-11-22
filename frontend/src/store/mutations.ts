import { State, state, User } from "./state";
import { MutationTree } from "vuex"

export enum MutationType {
    GetUsers = "GET_USERS",
    SetLoading = "SET_LOADING"
}


export type Mutations = {
    [MutationType.GetUsers](state: State, users: User[]): void
    [MutationType.SetLoading](state: State, value: boolean): void
}


export const mutations: MutationTree<State> & Mutations = {
    [MutationType.GetUsers](state, users) {
        state.users = users
    },
    [MutationType.SetLoading](state, value) {
        state.loading = value
    }
}