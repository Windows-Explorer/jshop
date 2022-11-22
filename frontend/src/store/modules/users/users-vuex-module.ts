import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IUser } from './user-interface'

@Module
export class UsersStoreModule extends VuexModule {
  usersState: IUser[] = []


  @Mutation
  getUsersMutation(users: IUser[]): void {
    this.usersState = users
  }


  @Action({ commit: "getTokenMutation" })
  async getUsers(): Promise<IUser[]> {
    return await (await fetch("http://localhost:3000")).json()
  }

  get getToken(): IUser[] {
    return this.usersState
  }
}