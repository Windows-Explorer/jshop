import { Controller, HttpException, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { RESULTER_TOKEN, LOGGER_TOKEN, CATEGORIES_SERVICE_TOKEN, SUBCATEGORIES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { ICategory } from "src/common/interfaces/data/category.interface"
import { IResult } from "src/common/interfaces/data/result.interface"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"
import { ICategoriesService } from "src/common/interfaces/services/categories.service.interface"
import { DeleteResult } from "typeorm"

@Controller("")
export class CategoriesController {
    constructor(
        @Inject(CATEGORIES_SERVICE_TOKEN) private readonly _categoriesService: ICategoriesService,
        @Inject(RESULTER_TOKEN) private readonly _output: IOutput,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ) { }

    @MessagePattern("products.categories.findAll")
    async findAllCategories(): Promise<IResult<ICategory[]>> {
        try {
            const result = await this._output.responseAsync(HttpStatus.OK, await this._categoriesService.findAll())
            return result
        }
        catch (error) {
            this._logger.log(error, "CATEGORIES-CONTROLLER: findAllCategories")
            throw new HttpException(error, 500)
        }
    }

    @MessagePattern("products.categories.save")
    async save(@Payload() category: ICategory): Promise<IResult<ICategory>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._categoriesService.save(category))
        return result
    }

    @MessagePattern("products.categories.remove")
    async remove(@Payload() id: number): Promise<IResult<DeleteResult>> {
        const result = await this._output.responseAsync(HttpStatus.OK, await this._categoriesService.remove(id))
        return result
    }
}