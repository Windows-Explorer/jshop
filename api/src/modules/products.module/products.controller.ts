import { Controller, Get, Inject, Param } from "@nestjs/common"
import { PRODUCTS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IProductsService } from "src/common/interfaces/services/products.service.interface"
import { IProduct } from "src/common/interfaces/types/product.interface"

@Controller("products")
export class ProductsController {
    constructor(@Inject(PRODUCTS_SERVICE_TOKEN) private readonly _productsService: IProductsService) { }

    @Get("/")
    async findAll(): Promise<IProduct[]> {
        return await this._productsService.findAll()
    }

    @Get("/:id")
    async findById(@Param("id") id: number): Promise<IProduct> {
        return await this._productsService.findById(id)
    }
}
