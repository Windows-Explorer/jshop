import { store } from "@/store"
import { customNotifies } from "@/store/notifies"
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { IFile } from "../../common/interfaces/file-object.interface"


@Module
export class FilesStoreModule extends VuexModule {
  filesState: string[] = []

  @Mutation
  filesMutation(files: string[]): void {
    this.filesState = files
  }

  @Action({ commit: "filesMutation" })
  async getFiles(): Promise<string[]> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/files`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${store.getters.token}` }
    })

    if(result.status === 200) {
      const files = await result.json()
      return files
    }

    customNotifies.negativeNotify()
    return []
  }

  @Action({ commit: "filesMutation" })
  async removeFile(filename: string): Promise<string[]> {
    const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/files/${filename}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${store.getters.token}`}
    })

    if(result.status === 200) {
      const files = await result.json()
      customNotifies.positiveNotify()
      return files
    }

    customNotifies.negativeNotify()
    return []
  }

  get files(): string[] {
    return this.filesState
  }

}