import { Body, Controller, Inject, Param, Post } from "@nestjs/common"
import { Delete } from "@nestjs/common/decorators"
import { PRODUCTS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { ProductCreateDto } from "src/common/dto/product-create.dto"
import { IProductsService } from "src/common/interfaces/services/products.service.interface"
import { IProduct } from "src/common/interfaces/types/product.interface"

@Controller("products")
export class ProductsProtectedController {
    constructor(@Inject(PRODUCTS_SERVICE_TOKEN) private readonly _productsService: IProductsService) { }

    @Post("/")
    async save(@Body() productCreateDto: ProductCreateDto): Promise<IProduct> {
        return await this._productsService.save(productCreateDto)
    }

    @Delete("/:id")
    async removeOne(@Param("id") id: number): Promise<IProduct[]> {
        return await this._productsService.removeOne(id)
    }
}