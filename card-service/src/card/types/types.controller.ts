import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { LOGGER_TOKEN, OUTPUT_TOKEN, TYPES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { ILogger } from "src/common/interfaces/logger.interface"
import { IOutput } from "src/common/interfaces/output.interface"
import { IResult } from "src/common/interfaces/result.interface"
import { ICardType } from "src/common/interfaces/type.interface"
import { ITypesService } from "src/common/interfaces/types.service.interface"

@Controller("")
export class TypesController {
    constructor(
        @Inject(TYPES_SERVICE_TOKEN) private readonly _typesService: ITypesService,
        @Inject(OUTPUT_TOKEN) private readonly _output: IOutput,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILogger
    ) {}

    @MessagePattern("cards.types.findAll")
    async findAll(): Promise<IResult<ICardType[]>> {
        const result: IResult<ICardType[]> = await this._output.responseAsync(HttpStatus.OK, await this._typesService.findAll())
        this._logger.log(result, "cards.types.findAll")
        return result
    }
}