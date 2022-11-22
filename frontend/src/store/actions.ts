import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State, User } from "./state";

export enum ActionTypes {
    GetUsers = "GET_USERS"
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetUsers](context: ActionAugments): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GetUsers]({ commit }) {
        commit(MutationType.SetLoading, true)

        const users: User[] = await (await fetch("http://localhost:3000")).json()

        commit(MutationType.GetUsers, users)
    }
}