import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { LOGGER_TOKEN, PRODUCTS_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { FindDto } from "src/common/dto/find.dto"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { IProduct } from "src/common/interfaces/product.interface"
import { IProductsService } from "src/common/interfaces/products.service.interface"
import { IResultAndCount } from "src/common/interfaces/result-and-count.interface"
import { IResult } from "src/common/interfaces/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"

@Controller("products")
export class ProductsController {
    constructor(
        @Inject(PRODUCTS_SERVICE_TOKEN) private readonly _productsService: IProductsService,
        @Inject(RESULTER_TOKEN) private readonly _output: IOutput,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ) {}

    @MessagePattern("products.findAll")
    async findAll(@Payload() payload: FindDto): Promise<IResult<IResultAndCount<IProduct[]> | IProduct[]>> {
        const result: IResult<IResultAndCount<IProduct[]> | IProduct[]> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.findAll(payload.page, payload.filter))
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
}
