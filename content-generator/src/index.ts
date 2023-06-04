import { AuthService } from "./auth.service"
import { ContentGenerator } from "./content-generator"
import { ICategory } from "./interfaces/category.interface"
import { IProduct } from "./interfaces/product.interface"
import { IUserSignUp } from "./interfaces/user.interface"
import { ParamsAPI } from "./params"

async function main() {
    const generator = new ContentGenerator(10)
    const authService = new AuthService()

    const userSignUp: IUserSignUp = {
        username: "admin",
        email: "admin@admin.admin",
        password: "12341234",
        phoneNumber: "+79999999999",
    }

    await generator.fillProducts()

    const token = await authService.getToken(userSignUp)
    console.log(token)
    generator.categories.forEach(async (category: ICategory) => {
        const response = await fetch(`${ParamsAPI.api_host}/categories`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        console.log(`Categories: ${response.status}`)
    })
    generator.products.forEach(async (product: IProduct) => {
        const response = await fetch(`${ParamsAPI.api_host}/products`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(product)
        })
        console.log(`Products ${response.status}`)
    })
}

main().then().catch()