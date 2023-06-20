import { ICategory } from "./interfaces/category.interface"
import { IGenerator } from "./interfaces/generator.interface"
import { ParamsAPI } from "./params"

export class CategoriesGenerator implements IGenerator<ICategory> {
    constructor(
        private readonly _token: string,
        private readonly _categoryNames: string[] = ["JustTea", "Coffee"]
    ) { }

    public async generate(): Promise<void> {
        this._categoryNames.forEach(async (value, index) => {
            const descriptionResponse = await (await fetch("https://fish-text.ru/get?number=1")).json()

            const category: ICategory = {
                description: descriptionResponse.text,
                name: this._categoryNames[index]
            }

            const response = await fetch(`${ParamsAPI.api_host}/categories`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this._token}`
                },
                body: JSON.stringify(category)
            })
            console.log(`[GENERATE] Categories: ${response.status} ${await response.text()}`)
        })
    }

    public async get(): Promise<ICategory[]> {
        const response = await fetch(`${ParamsAPI.api_host}/categories`)
        const categories: ICategory[] = await response.json()
        categories.forEach(async (value) => {
            console.log(`[GET] Categories: ${value}`)
        })
        return categories
    }

}