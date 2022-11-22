import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";

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

        const users = await (await fetch("https://localhost:3000", { method: "GET" })).json()

        commit(MutationType.GetUsers, users)
    }
}