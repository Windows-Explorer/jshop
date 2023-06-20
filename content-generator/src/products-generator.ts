import { loremIpsum } from "lorem-ipsum";
import { ICategory } from "./interfaces/category.interface"
import { IGenerator } from "./interfaces/generator.interface"
import { IProduct } from "./interfaces/product.interface"
import { ParamsAPI } from "./params";
import BeautifulDom from "beautiful-dom";

export class ProductsGenerator implements IGenerator<IProduct> {
    constructor(
        private readonly _token: string,
        private readonly _categories: ICategory[],
        private readonly _maxCost: number = 3000,
        private readonly _minCost: number = 1000,
        private readonly _productsCount: number = 10
    ) { }

    private _images: string[] = []

    private async fillImages() {
        this._images = []
        const response = await (await fetch("https://ld-wt73.template-help.com/tf/beans/coffe/catalog.html")).text()
        const document = new BeautifulDom(response)
        const imageWrappers = document.getElementsByClassName("product-img-wrap")
        for (let index = 0; index < imageWrappers.length; index++) {
            const imageAttribute = imageWrappers[index].getElementsByTagName("a")[0].getElementsByTagName("img")[0]
            const image = `https://ld-wt73.template-help.com/tf/beans/coffe/${imageAttribute.getAttribute("src")}`
            console.log(image)
            this._images.push(image)
        }
    }

    async generate(): Promise<void> {
        await this.fillImages()
        for (let index = 0; index < this._productsCount; index++) {
            const descriptionResponse = await (await fetch("https://fish-text.ru/get?number=1")).json()
            const product: IProduct = {
                title: loremIpsum({
                    count: 2,
                    format: "plain",
                    suffix: ""
                }),
                cost: Math.floor(Math.random() * (this._maxCost - this._minCost + 1)) + this._minCost,
                description: descriptionResponse.text,
                category: this._categories[Math.floor(Math.random() * (this._categories.length))],
                image: this._images[Math.floor(Math.random() * (this._images.length))]
            }

            const response = await fetch(`${ParamsAPI.api_host}/products`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this._token}`
                },
                body: JSON.stringify(product)
            })
            console.log(`[GENERATE] Products: ${response.status} ${await response.text()}`)
        }
    }

    async get(): Promise<IProduct[]> {
        const response = await fetch(`${ParamsAPI.api_host}/products`)
        const products: IProduct[] = await response.json()
        products.forEach(async (value) => {
            console.log(`[GET] Categories: ${value}`)
        })
        return products
    }

}