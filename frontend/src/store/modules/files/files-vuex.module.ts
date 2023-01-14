import { store } from "@/store"
import { customNotifies } from "@/store/notifies"
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { IProduct } from "../products/product.interface"
import { IFile } from "./file-object.interface"


@Module
export class CartStoreModule extends VuexModule {
  filesState: IFile[] = []

  @Mutation
  filesMutation(files: IFile[]): void {
    this.filesState = files
  }

  @Action({ commit: "cartMutation" })
  async getAllFiles(): Promise<IFile[]> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/files`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${store.getters.token}` }
    })

    if(result.status === 200) {
      const files = await result.json()
      return files
    }

    customNotifies.positiveNotify()
    return []
  }

  get files(): IFile[] {
    return this.filesState
  }

}