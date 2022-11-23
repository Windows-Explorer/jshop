import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IUser } from './user.interface'

@Module
export class UsersStoreModule extends VuexModule {
  usersState: IUser[] = []


  @Mutation
  getUsersMutation(users: IUser[]): void {
    this.usersState = users
  }


  @Action({ commit: "getTokenMutation" })
  async getUsersAction(): Promise<IUser[]> {
    return await (await fetch("http://localhost:3000")).json()
  }

  get getUsers(): IUser[] {
    return this.usersState
  }
}