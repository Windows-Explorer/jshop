import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { PRODUCTS_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { FindDto } from "src/common/dto/find.dto"
import { IProduct } from "src/common/interfaces/data/product.interface"
import { IResult } from "src/common/interfaces/data/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"
import { IProductsService } from "src/common/interfaces/services/products.service.interface"
import { DeleteResult } from "typeorm"


@Controller("products")
export class ProductsController {
    constructor(
        @Inject(PRODUCTS_SERVICE_TOKEN) private readonly _productsService: IProductsService,
        @Inject(RESULTER_TOKEN) private readonly _output: IOutput
    ) {}

    @MessagePattern("products.findAll")
    async findAll(@Payload() payload: FindDto): Promise<IResult<IProduct[]>> {
        const result: IResult<IProduct[]> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.findAll(payload.page, payload.filter))
        return result
    }

    @MessagePattern("products.count")
    async count(@Payload() payload: FindDto): Promise<IResult<{ count: number }>> {
        const result: IResult<{ count: number }> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.count(payload.page, payload.filter))
        return result
    }

    @MessagePattern("products.findById")
    async findById(@Payload() id: number): Promise<IResult<IProduct>> {
        const result: IResult<IProduct> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.findById(id))
        return result
    }

    @MessagePattern("products.save")
    async save(@Payload() product: IProduct): Promise<IResult<IProduct>> {
        const result: IResult<IProduct> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.save(product))
        return result
    }

    @MessagePattern("products.remove")
    async remove(@Payload() id: number): Promise<IResult<DeleteResult>> {
        const result: IResult<DeleteResult> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.remove(id))
        return result
    }
}
