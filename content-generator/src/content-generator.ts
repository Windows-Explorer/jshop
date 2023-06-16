import BeautifulDom from "beautiful-dom"
import { categoryNames } from "./data/categoryNames"
import { ICategory } from "./interfaces/category.interface"
import { IProduct } from "./interfaces/product.interface"
import { loremIpsum } from "lorem-ipsum"

export class ContentGenerator {
    constructor(productsCount: number = 10) {
        this.productsCount = productsCount
    }

    private productsCount = 0
    public categories: ICategory[] = []
    public products: IProduct[] = []
    public images: string[] = []


    private async fillCategories() {
        this.categories = []
        for (let index = 0; index < categoryNames.length; index++) {
            const descriptionResponse = await (await fetch("https://fish-text.ru/get?number=1")).json()
            const category: ICategory = {
                description: descriptionResponse.text,
                name: categoryNames[index]
            }
            console.log(category)
            this.categories.push(category)
        }
    }

    async fillProducts() {
        this.products = []
        await this.fillCategories()
        await this.getImagesFromWebTemplate()
        const maxCost = 3000
        const minCost = 1000
        for (let index = 0; index < this.productsCount; index++) {
            const descriptionResponse = await (await fetch("https://fish-text.ru/get?number=1")).json()
            const product: IProduct = {
                title: loremIpsum({
                    count: 1,
                    format: "plain",
                    suffix: ""
                }),
                cost: Math.floor(Math.random() * (maxCost - minCost + 1)) + minCost,
                description: descriptionResponse.text,
                category: this.categories[Math.floor(Math.random() * (this.categories.length))],
                image: this.images[Math.floor(Math.random() * (this.images.length))]
            }
            console.log(product)
            this.products.push(product)
        }
    }

    private async getImagesFromWebTemplate() {
        this.images = []
        const response = await (await fetch("https://ld-wt73.template-help.com/tf/beans/coffe/catalog.html")).text()
        const document = new BeautifulDom(response)
        const imageWrappers = document.getElementsByClassName("product-img-wrap")
        for (let index = 0; index < imageWrappers.length; index++) {
            const imageAttribute = imageWrappers[index].getElementsByTagName("a")[0].getElementsByTagName("img")[0]
            const image = `https://ld-wt73.template-help.com/tf/beans/coffe/${imageAttribute.getAttribute("src")}`
            console.log(image)
            this.images.push(image)
        }
    }
}