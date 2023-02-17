import { Controller, HttpException, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { LOGGER_TOKEN, PRODUCTS_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { FindDto } from "src/common/dto/find.dto"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { IProduct } from "src/common/interfaces/product.interface"
import { IProductsService } from "src/common/interfaces/products.service.interface"
import { IResultAndCount } from "src/common/interfaces/result-and-count.interface"
import { IResult } from "src/common/interfaces/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"
import { DeleteResult } from "typeorm"

@Controller("products")
export class ProductsController {
    constructor(
        @Inject(PRODUCTS_SERVICE_TOKEN) private readonly _productsService: IProductsService,
        @Inject(RESULTER_TOKEN) private readonly _output: IOutput,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ) {}

    @MessagePattern("products.findAll")
    async findAll(@Payload() payload: FindDto): Promise<IResult<IProduct[]>> {
        try {
            const result: IResult<IProduct[]> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.findAll(payload.page, payload.filter))
            return result
        }
        catch(error) {
            this._logger.log(error, "PRODUCTS-CONTROLLER: findAll")
            throw new HttpException(error, 500)
        }
    }

    @MessagePattern("products.count")
    async count(@Payload() payload: FindDto): Promise<IResult<{ count: number }>> {
        try {
            const result: IResult<{ count: number }> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.count(payload.page, payload.filter))
            return result
        }
        catch(error) {
            this._logger.log(error, "PRODUCTS-CONTROLLER: count")
            throw new HttpException(error, 500)
        }
    }

    @MessagePattern("products.findById")
    async findById(@Payload() id: number): Promise<IResult<IProduct>> {
        try {
            const result: IResult<IProduct> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.findById(id))
            return result
        }
        catch(error) {
            this._logger.log(error, "PRODUCTS-CONTROLLER: findById")
            throw new HttpException(error, 500)
        }
    }

    @MessagePattern("products.save")
    async save(@Payload() product: IProduct): Promise<IResult<IProduct>> {
        try {
            const result: IResult<IProduct> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.save(product))
            return result
        }
        catch(error) {
            this._logger.log(error, "PRODUCTS-CONTROLLER: save")
            throw new HttpException(error, 500)
        }
    }

    @MessagePattern("products.remove")
    async remove(@Payload() id: number): Promise<IResult<DeleteResult>> {
        try {
            const result: IResult<DeleteResult> = await this._output.responseAsync(HttpStatus.OK, await this._productsService.remove(id))
            return result
        }
        catch(error) {
            this._logger.log(error, "PRODUCTS-CONTROLLER: remove")
            throw new HttpException(error, 500)
        }
    }
}
