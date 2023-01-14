import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { PRODUCTS_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IProductsService } from "src/common/interfaces/products.service.interface"
import { IResult } from "src/common/interfaces/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"
import { Product } from "./entities/product.entity"

@Controller("products")
export class ProductsController {
    constructor(
        @Inject(PRODUCTS_SERVICE_TOKEN) private readonly _productsService: IProductsService,
        @Inject(RESULTER_TOKEN) private readonly _output: IOutput
    ) {}

    @MessagePattern("products.findAll")
    async findAll(): Promise<IResult<Product[]>> {
        const result: IResult<Product[]> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.findAll())
        return result
    }

    @MessagePattern("products.findById")
    async findById(@Payload() id: number): Promise<IResult<Product>> {
        const result: IResult<Product> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.findById(id))
        return result
    }

    @MessagePattern("products.save")
    async save(@Payload() product: Product): Promise<IResult<Product>> {
        const result: IResult<Product> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.save(product))
        return result
    }

    @MessagePattern("products.saveMany")
    async saveMany(@Payload() products: Product[]): Promise<IResult<Product[]>> {
        const result: IResult<Product[]> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.saveMany(products))
        return result
    }

    @MessagePattern("products.removeOne")
    async removeOne(@Payload() id: number): Promise<IResult<Product[]>> {
        const result: IResult<Product[]> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.removeOne(id))
        return result
    }
}
