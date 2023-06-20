import { AuthService } from "./auth.service"
import { CategoriesGenerator } from "./categories-generator"
import { IUserSignUp } from "./interfaces/user.interface"
import { ProductsGenerator } from "./products-generator"

async function main() {
    const authService = new AuthService()
    const userSignUp: IUserSignUp = {
        username: "admin",
        email: "admin@admin.admin",
        password: "12341234",
        phoneNumber: "+79999999999",
    }
    const token = await authService.getToken(userSignUp)

    const categoriesGenerator = new CategoriesGenerator(token)
    await categoriesGenerator.generate()

    const productsGenerator = new ProductsGenerator(token, await categoriesGenerator.get())

    productsGenerator.generate()
}

main()